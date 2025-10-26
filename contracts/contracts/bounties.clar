;; contracts/bounties.clar
;; Smart contract para manejar los bounties (trabajos) con pagos en sBTC

;; Contract deployed in https://explorer.hiro.so/txid/dd6734c8d564f505b9364b8733d07b3d6c6ae5b2212694ecfa68822524e12ff5?chain=testnet

(define-data-var bounty-counter uint u0)

(define-map bounties
  uint
  {
    company: principal,
    description: (string-ascii 200),
    reward: uint,
    applicant: (optional principal),
    completed: bool,
    paid: bool
  }
)

;; ================================
;; EVENTOS
;; ================================
(define-event bounty-created (bounty-id uint) (company principal) (reward uint))
(define-event bounty-applied (bounty-id uint) (user principal))
(define-event bounty-completed (bounty-id uint) (user principal))
(define-event bounty-paid (bounty-id uint) (user principal) (amount uint))

;; ================================
;; FUNCIONES PRINCIPALES
;; ================================

;; Crear un nuevo bounty
(define-public (create-bounty (description (string-ascii 200)) (reward uint))
  (let (
        (bounty-id (+ (var-get bounty-counter) u1))
        (sender tx-sender)
      )
    (begin
      (var-set bounty-counter bounty-id)
      (map-set bounties bounty-id {
        company: sender,
        description: description,
        reward: reward,
        applicant: none,
        completed: false,
        paid: false
      })
      (print (emit-event bounty-created (tuple (bounty-id bounty-id) (company sender) (reward reward))))
      (ok bounty-id)
    )
  )
)

;; Aplicar a un bounty
(define-public (apply-bounty (bounty-id uint))
  (let ((bounty (map-get? bounties bounty-id)))
    (match bounty
      bounty-data
        (if (is-none (get applicant bounty-data))
            (begin
              (map-set bounties bounty-id (merge bounty-data { applicant: (some tx-sender) }))
              (print (emit-event bounty-applied (tuple (bounty-id bounty-id) (user tx-sender))))
              (ok true)
            )
            (err u100))
      (err u404)
    )
  )
)

;; Completar un bounty (la empresa marca como completado)
(define-public (complete-bounty (bounty-id uint))
  (let ((bounty (map-get? bounties bounty-id)))
    (match bounty
      bounty-data
        (if (and (is-eq (get company bounty-data) tx-sender) (not (get completed bounty-data)))
            (begin
              (map-set bounties bounty-id (merge bounty-data { completed: true }))
              (print (emit-event bounty-completed (tuple (bounty-id bounty-id) (user (unwrap! (get applicant bounty-data) (err u401))))))
              (ok true)
            )
            (err u403))
      (err u404)
    )
  )
)

;; Liberar pago (simulación, en deploy real se usaría sBTC)
(define-public (release-payment (bounty-id uint))
  (let ((bounty (map-get? bounties bounty-id)))
    (match bounty
      bounty-data
        (if (and (get completed bounty-data) (not (get paid bounty-data)) (is-eq (get company bounty-data) tx-sender))
            (let ((applicant (unwrap! (get applicant bounty-data) (err u401)))
                  (amount (get reward bounty-data)))
              (begin
                (map-set bounties bounty-id (merge bounty-data { paid: true }))
                (print (emit-event bounty-paid (tuple (bounty-id bounty-id) (user applicant) (amount amount))))
                (ok amount)
              )
            )
            (err u403))
      (err u404)
    )
  )
)

;; Ver detalle de un bounty
(define-read-only (get-bounty (bounty-id uint))
  (map-get? bounties bounty-id)
)
