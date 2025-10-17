;; Smart contract de Usuarios / CVs para CV Chain

;; Mapa de usuarios
(define-map users
  ((wallet principal)) ;; key: la wallet del usuario
  ((name (string-ascii 50)) ;; nombre completo
   (email (string-ascii 50)) ;; correo electrónico
   (cv-complete bool) ;; indica si el CV está completo
   (experiences (list 10 (string-ascii 100))) ;; lista de experiencias laborales
   (studies (list 10 (string-ascii 100))) ;; lista de estudios/certificaciones
   (skills (list 10 (string-ascii 50))))) ;; lista de habilidades

;; Registrar un nuevo usuario
(define-public (register-user (name (string-ascii 50)) (email (string-ascii 50)))
  (begin
    (asserts! (is-none (map-get users ((wallet tx-sender)))) (err "User already registered"))
    (map-set users ((wallet tx-sender))
             ((name name)
              (email email)
              (cv-complete false)
              (experiences '())
              (studies '())
              (skills '())))
    (ok true)))

;; Crear o actualizar CV
(define-public (create-cv 
                 (experiences-list (list 10 (string-ascii 100))) 
                 (studies-list (list 10 (string-ascii 100))) 
                 (skills-list (list 10 (string-ascii 50))))
  (begin
    ;; Asegurarse de que el usuario esté registrado
    (let ((user (unwrap! (map-get users ((wallet tx-sender))) (err "User not registered"))))
      (map-set users ((wallet tx-sender))
               ((name (get name user))
                (email (get email user))
                (cv-complete true)
                (experiences experiences-list)
                (studies studies-list)
                (skills skills-list))))
    (ok true)))

;; Consultar usuario
(define-read-only (get-user (wallet principal))
  (map-get users ((wallet wallet))))
