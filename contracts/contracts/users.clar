;; users.clar
;; Smart Contract para registrar usuarios y crear CVs on-chain

;; Contract deployed in https://explorer.hiro.so/txid/75d5ef057dbc2cfce51eacc729052a300aaccfac42af7ed233fce46c13af5942?chain=testnet

(define-map users 
  { wallet: principal } 
  { name: (string-ascii 50),
    email: (string-ascii 50),
    cv-complete: bool,
    experiences: (list 10 (string-ascii 100)),
    studies: (list 10 (string-ascii 100)),
    skills: (list 10 (string-ascii 50)) })

;; Registrar un nuevo usuario
(define-public (register-user (name (string-ascii 50)) (email (string-ascii 50)))
  (begin
    (asserts! (is-none (map-get? users { wallet: tx-sender })) (err "User already registered"))
    (map-set users 
      { wallet: tx-sender } 
      { name: name,
        email: email,
        cv-complete: false,
        experiences: (list),
        studies: (list),
        skills: (list) })
    (ok true)))

;; Crear o actualizar CV
(define-public (create-cv 
                 (experiences-list (list 10 (string-ascii 100))) 
                 (studies-list (list 10 (string-ascii 100))) 
                 (skills-list (list 10 (string-ascii 50))))
  (begin
    ;; Asegurarse de que el usuario este registrado
    (let ((user (unwrap! (map-get? users { wallet: tx-sender }) (err "User not registered"))))
      (map-set users 
        { wallet: tx-sender } 
        { name: (get name user),
          email: (get email user),
          cv-complete: true,
          experiences: experiences-list,
          studies: studies-list,
          skills: skills-list }))
    (ok true)))

;; Consultar usuario
(define-read-only (get-user (wallet principal))
  (map-get? users { wallet: wallet }))
