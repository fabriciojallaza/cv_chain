import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";
import { assertEquals, assertOk } from "https://deno.land/std@0.203.0/testing/asserts.ts";

Clarinet.test({
  name: "Debe permitir crear un bounty correctamente",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const company = accounts.get("wallet_1")!;
    const block = chain.mineBlock([
      Tx.contractCall("bounties", "create-bounty", [
        types.utf8("Desarrollar dashboard en React"),
        types.uint(1000)
      ], company.address)
    ]);

    block.receipts[0].result.expectOk();
    assertEquals(block.receipts.length, 1);

    const bounty = chain.callReadOnlyFn("bounties", "get-bounty", [types.uint(1)], company.address);
    bounty.result.expectSome();
  }
});

Clarinet.test({
  name: "Debe permitir aplicar a un bounty y marcarlo como completado y pagado",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const company = accounts.get("wallet_1")!;
    const user = accounts.get("wallet_2")!;

    chain.mineBlock([
      Tx.contractCall("bounties", "create-bounty", [
        types.utf8("Desarrollar backend API"),
        types.uint(2000)
      ], company.address)
    ]);

    chain.mineBlock([
      Tx.contractCall("bounties", "apply-bounty", [types.uint(1)], user.address)
    ]);

    chain.mineBlock([
      Tx.contractCall("bounties", "complete-bounty", [types.uint(1)], company.address)
    ]);

    const result = chain.mineBlock([
      Tx.contractCall("bounties", "release-payment", [types.uint(1)], company.address)
    ]);

    result.receipts[0].result.expectOk();
    assertOk(result);
  }
});
