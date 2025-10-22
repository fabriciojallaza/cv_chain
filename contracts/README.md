# CV Chain - Descripción de Smart Contracts

## users.clar
Este contrato sirve para **registrar usuarios y crear sus CVs on-chain**.  
Permite a los profesionales:  
- Registrarse con su wallet, nombre y correo.  
- Crear o actualizar su CV con experiencias, estudios y habilidades.  
- Marcar su CV como completo, preparándolo para futuras funciones como la emisión de NFTs.  
- Consultar la información registrada de cualquier usuario.

## companies.clar
Este contrato permite **registrar empresas e instituciones verificadas** en CV Chain.  
Las empresas pueden:  
- Registrarse en la plataforma.  
- Acreditar experiencias laborales de usuarios.  
- Emitir NFTs de trabajador validadas para sus empleados.

## nfts.clar
Este contrato gestiona **los NFTs soulbound** utilizados en CV Chain.
Permite:
* Emitir NFTs únicos para los **CVs on-chain** de los usuarios.
* Emitir NFTs de **acreditación laboral** otorgados por empresas verificadas.
* Asociar metadata con información del usuario, empresa, fechas y descripciones.
* Asegurar que los NFTs sean **no transferibles (soulbound)**, garantizando autenticidad y permanencia.

## bounties.clar
Este contrato maneja el **marketplace de bounties o trabajos Web3** en la plataforma CV Chain.  
Permite a las empresas crear ofertas laborales con pagos en sBTC (simulados aquí con Clarity).  

Funciones principales:
- **create-bounty(description, reward)** → crea un nuevo bounty con descripción y monto de recompensa.  
- **apply-bounty(bounty-id)** → permite a un usuario postularse al bounty.  
- **complete-bounty(bounty-id)** → la empresa marca el bounty como completado.  
- **release-payment(bounty-id)** → libera el pago del bounty (escrow simulado).  
- **get-bounty(bounty-id)** → consulta los datos de un bounty.  

Eventos importantes:
- `bounty-created`
- `bounty-applied`
- `bounty-completed`
- `bounty-paid`


