const { WalletConnectSignClient } = window.WalletConnectSignClient;
const { Web3Modal } = window.Web3Modal;

const client = WalletConnectSignClient.init({
  projectId: "YOUR_PROJECT_ID", // Get from walletconnect.com
  relayUrl: "wss://relay.walletconnect.com",
}).catch(console.error);

const web3modal = new Web3Modal({ projectId: "YOUR_PROJECT_ID" });

document.getElementById("connectButton").addEventListener("click", async () => {
  const wcClient = await client;
  const { uri, approval } = await wcClient.connect({
    requiredNamespaces: {
      eip155: { chains: ["eip155:1"], methods: ["eth_sign"] },
    },
  });
  await web3modal.openModal({ uri });
  const session = await approval();
  document.getElementById("account").textContent = `Connected: ${session.namespaces.eip155.accounts[0]}`;
});
