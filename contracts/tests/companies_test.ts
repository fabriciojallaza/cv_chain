import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";

Clarinet.test({
  name: "Registrar una empresa correctamente",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const company1 = accounts.get("wallet_1")!;

    // Registrar empresa
    let block = chain.mineBlock([
      Tx.contractCall(
        "companies",
        "register-company",
        [types.ascii("CVChain Ltd.")],
        company1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);

    // Intentar registrar de nuevo (debe fallar)
    block = chain.mineBlock([
      Tx.contractCall(
        "companies",
        "register-company",
        [types.ascii("CVChain Ltd.")],
        company1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectAscii("Company already registered");
  },
});

Clarinet.test({
  name: "Consultar empresa registrada",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const company1 = accounts.get("wallet_1")!;

    const block = chain.mineBlock([
      Tx.contractCall(
        "companies",
        "get-company",
        [types.principal(company1.address)],
        company1.address
      ),
    ]);

    const companyData = block.receipts[0].result.expectSome();
    companyData.expectTuple(); // Verifica que la información esté en formato tuple
  },
});

Clarinet.test({
  name: "Empresa acredita experiencia de usuario",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const company1 = accounts.get("wallet_1")!;
    const user1 = accounts.get("wallet_2")!;

    // La empresa acredita experiencia de un usuario
    const block = chain.mineBlock([
      Tx.contractCall(
        "companies",
        "verify-user-experience",
        [types.principal(user1.address), types.uint(1)], // experience-id 1
        company1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
  },
});
