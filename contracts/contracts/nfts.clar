;; nfts.clar
;; Contrato que maneja NFTs soulbound de CV y acreditaciones de empresas

;; Contract deployed in https://explorer.hiro.so/txid/6158d8470eda01cdaeff94279d20d4743ae14e34eb575166c57cde3c7b3aff68?chain=testnet

(define-map nfts
  ((nft-id uint))
  ((owner principal)
   (tipo (string-ascii 20))       ;; "CV" o "Acreditacion"
   (metadata (tuple 
               (nombre (string-ascii 50))
               (empresa (string-ascii 50))
               (fecha (string-ascii 20))
               (descripcion (string-ascii 100))
               (enlaces (list 10 (string-ascii 50)))
             )
   )
   (soulbound bool)
  )
)

(define-data-var next-id uint 1)

;; Mint de un NFT
(define-public (mint-nft (owner principal) (tipo (string-ascii 20)) (metadata (tuple (nombre (string-ascii 50)) (empresa (string-ascii 50)) (fecha (string-ascii 20)) (descripcion (string-ascii 100)) (enlaces (list 10 (string-ascii 50))))))
  (let ((id (var-get next-id)))
    (begin
      (map-set nfts
        ((nft-id id))
        ((owner owner)
         (tipo tipo)
         (metadata metadata)
         (soulbound true)
        )
      )
      (var-set next-id (+ id 1))
      (ok id)
    )
  )
)

;; Consultar NFT
(define-read-only (get-nft (id uint))
  (map-get? nfts ((nft-id id)))
)

;; Comprobar si un NFT es soulbound
(define-read-only (soulbound-check (id uint))
  (match (map-get? nfts ((nft-id id)))
    entry (ok (get soulbound entry))
    (err "NFT no existe")
  )
)
