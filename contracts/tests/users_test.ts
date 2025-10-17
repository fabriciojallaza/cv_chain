import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";

Clarinet.test({
  name: "Registrar un usuario correctamente",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user1 = accounts.get("wallet_1")!;

    // Registrar usuario
    let block = chain.mineBlock([
      Tx.contractCall(
        "users",
        "register-user",
        [types.ascii("Juan Manuel Elias"), types.ascii("juan@example.com")],
        user1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);

    // Intentar registrar de nuevo (debe fallar)
    block = chain.mineBlock([
      Tx.contractCall(
        "users",
        "register-user",
        [types.ascii("Juan Manuel Elias"), types.ascii("juan@example.com")],
        user1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectAscii("User already registered");
  },
});
