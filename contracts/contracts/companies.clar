;; Smart contract de Empresas / Instituciones para CV Chain

;; Mapa de empresas registradas
(define-map companies
  ((wallet principal)) ;; wallet de la empresa
  ((name (string-ascii 50)) ;; nombre de la empresa
   (verified bool)))) ;; indica si está verificada en la plataforma

;; Registrar una nueva empresa
(define-public (register-company (name (string-ascii 50)))
  (begin
    (asserts! (is-none (map-get companies ((wallet tx-sender)))) (err "Company already registered"))
    (map-set companies ((wallet tx-sender))
             ((name name)
              (verified true))) ;; por ahora, se marca como verificada automáticamente
    (ok true)))

;; Consultar empresa
(define-read-only (get-company (wallet principal))
  (map-get companies ((wallet wallet))))

;; Acreditar experiencia de un usuario
(define-public (verify-user-experience (user-wallet principal) (experience-id uint))
  (begin
    ;; Validar que la empresa esté registrada
    (asserts! (map-get companies ((wallet tx-sender))) (err "Company not registered"))
    ;; Aquí solo registramos que la empresa acredita al usuario para ese experience-id
    ;; Más adelante se puede integrar con el contrato de NFTs
    (ok true)))