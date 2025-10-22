import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";
import { assertEquals, assertOk } from "https://deno.land/std@0.203.0/testing/asserts.ts";

Clarinet.test({
  name: "Usuario puede suscribirse a WorkPro y verificar estado",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user = accounts.get("wallet_1")!;
    
    // Suscribirse al plan premium
    let block = chain.mineBlock([
      Tx.contractCall("memberships", "subscribe-premium", [types.utf8("WorkPro"), types.uint(100)], user.address)
    ]);

    block.receipts[0].result.expectOk();

    // Verificar estado de la membresía
    const status = chain.callReadOnlyFn("memberships", "check-premium-status", [types.principal(user.address)], user.address);
    status.result.expectOk().expectBool(true);
  }
});

Clarinet.test({
  name: "Usuario puede cancelar su membresía WorkPro",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user = accounts.get("wallet_1")!;
    
    // Suscribirse primero
    chain.mineBlock([
      Tx.contractCall("memberships", "subscribe-premium", [types.utf8("WorkPro"), types.uint(100)], user.address)
    ]);

    // Cancelar membresía
    let block = chain.mineBlock([
      Tx.contractCall("memberships", "cancel-membership", [], user.address)
    ]);

    block.receipts[0].result.expectOk();

    // Verificar estado
    const status = chain.callReadOnlyFn("memberships", "check-premium-status", [types.principal(user.address)], user.address);
    status.result.expectOk().expectBool(false);
  }
});
