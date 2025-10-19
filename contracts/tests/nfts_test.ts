import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";

Clarinet.test({
  name: "Mint, consultar y verificar NFT soulbound",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user1 = accounts.get("wallet_1")!;

    // Metadata de ejemplo
    const metadata = types.tuple({
      nombre: types.ascii("Juan Manuel Elias"),
      empresa: types.ascii("CVChain Ltd."),
      fecha: types.ascii("2025-10-17"),
      descripcion: types.ascii("Experiencia en desarrollo Web3"),
      enlaces: types.list([types.ascii("https://github.com/juan")])
    });

    // Mint de NFT
    let block = chain.mineBlock([
      Tx.contractCall(
        "nfts",
        "mint-nft",
        [
          types.principal(user1.address),
          types.ascii("CV"),
          metadata
        ],
        user1.address
      ),
    ]);

    const nftId = block.receipts[0].result.expectOk().expectUint(1);

    // Consultar NFT
    block = chain.mineBlock([
      Tx.contractCall(
        "nfts",
        "get-nft",
        [types.uint(nftId)],
        user1.address
      ),
    ]);

    const nftData = block.receipts[0].result.expectSome();
    nftData.expectTuple();

    // Verificar que es soulbound
    block = chain.mineBlock([
      Tx.contractCall(
        "nfts",
        "soulbound-check",
        [types.uint(nftId)],
        user1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
  },
});
