import chai, { expect } from "chai";
import * as anchor from "@project-serum/anchor";
import chaiBN from "chai-bn";
import { SystemProgram } from "@solana/web3.js";

chai.use(chaiBN(anchor.BN));

describe("basic-1", () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const myAccount = anchor.web3.Keypair.generate();

  it("Creates and initializes an account in two different transactions", async () => {
    // The program owning the account to create.
    const program = anchor.workspace.Basic1;

    // Execute the RPC.
    // #region code-separated
    await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        myAccount: myAccount.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        payer: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });
    // #endregion code-separated

    // Fetch the newly created account from the cluster.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was initialized.
    expect(account.data).to.be.bignumber.equal(new anchor.BN(1234));
  });

  it("Updates a previously created account", async () => {
    // The program to execute.
    const program = anchor.workspace.Basic1;

    // Invoke the update rpc.
    await program.rpc.update(new anchor.BN(4321), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });

    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    expect(account.data).to.be.bignumber.equal(new anchor.BN(4321));

    // #endregion update-test
  });
});
