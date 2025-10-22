;; contracts/memberships.clar
;; Smart contract para gestionar membresías premium (WorkPro) en CV Chain

(define-map memberships
  principal
  {
    plan: (string-ascii 20),
    start-date: uint,
    end-date: uint,
    active: bool
  }
)

;; ================================
;; EVENTOS
;; ================================
(define-event membership-subscribed (user principal) (plan (string-ascii 20)) (start-date uint) (end-date uint))
(define-event membership-cancelled (user principal) (plan (string-ascii 20)))

;; ================================
;; FUNCIONES PRINCIPALES
;; ================================

;; Suscribirse a un plan WorkPro
(define-public (subscribe-premium (plan (string-ascii 20)) (duration uint))
  (let (
        (sender tx-sender)
        (current-time (block-height))
        (end-time (+ current-time duration))
      )
    (begin
      (map-set memberships sender {
        plan: plan,
        start-date: current-time,
        end-date: end-time,
        active: true
      })
      (print (emit-event membership-subscribed (tuple (user sender) (plan plan) (start-date current-time) (end-date end-time))))
      (ok true)
    )
  )
)

;; Consultar el estado de la membresía
(define-read-only (check-premium-status (user principal))
  (match (map-get? memberships user)
    membership
      (ok (get active membership))
    (err u404)
  )
)

;; Cancelar membresía
(define-public (cancel-membership)
  (let ((membership (map-get? memberships tx-sender)))
    (match membership
      m
        (begin
          (map-set memberships tx-sender (merge m { active: false }))
          (print (emit-event membership-cancelled (tuple (user tx-sender) (plan (get plan m)) )))
          (ok true)
        )
      (err u404)
    )
  )
)
