import React, { Component } from 'react';
import { Head } from 'react-static';


class FaqPage extends Component {

  developerMetadata() {
    return {
      "name": "BotChain",
      "organization": "Talla",
      "street_1": "23 Green Street",
      "street_2": "",
      "city": "Boston",
      "state/province": "MA",
      "postal_code": "123",
      "country": "USA",
      "phone": "12345678",
      "phone_ext" : "",
      "email": "info@talla.com",
      "url": "http://talla.com"
    }
  }

  botMetadata() {
    return {
      "developer_id": "0x123123",
      "name": "bot #1",
      "description": "description of bot #1",
      "tags": "tag1, tag2, tag3"
    }
  }

  render() {
    return (
      <div className="faq">
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <h2>BotChain Alpha Platform UI - FAQs</h2>
        <h3 id="question_1"> Where does the Botchain dApp deployed?</h3>
        <p>The Botchain dApp is deployed on Ethereum’s Kovan test network </p>
        <h3 id="question_2">What is Metamask?</h3>
        <p><a href="https://metamask.io/">MetaMask</a> is a bridge that allows you to visit the distributed web of tomorrow in your browser today. MetaMask includes a secure identity vault, providing a user interface to manage your identities on different sites and sign blockchain transactions.You can install the MetaMask add-on in Chrome, Firefox, Opera, and the new Brave browser.<br/>Metamask browser plugin is REQUIRED for the Botchain Platform user interface to work.</p>
        <h3 id="question_3">How do I obtain an ETH Address?</h3>
        <p>There are many different Ethereum wallets out there, and most of them are fine to use. We recommend using <a href="https://metamask.io/">Metamask</a> or <a href="https://myetherwallet.com">MyEtherWallet</a> for those of you who are unfamiliar with different wallets. It’s the most user-friendly.</p>
        <h3 id="question_4">What is Botcoin(BOTC)? </h3>
        <p>Botcoin is the token that is used to pay for services in the Botchain Network.</p>
        <h3 id="question_5">How long does it take for an Ethereum transaction to complete?</h3>
        <p>It all depends on various factors including network load, congestion, gas prices etc. It can range anywhere from a few seconds to up to an hour for a transaction to complete.</p>
        <h3 id="question_6">What to do when an Ethereum transaction fails?</h3>
        <p>The best option is to retry with a higher gas price to see if the transaction goes through. If you are still facing issues contact <a href="mailto:botchain@talla.com">support.</a></p>

        <h2 id="developer_registration">Botchain Developer Registration</h2>

        <h3 id="question_7">What are the required parameters to register as a Developer?</h3>
        <p>
          You have to be pre-approved to register as a developer. You can request early access here. There are 3 required parameters:<br/>
          <ul>
            <li>ETH Address of Developer</li>
            <li>Developer Metadata URL</li>
            <li>Developer Metadata in Json format</li>
          </ul>
          <br/>
          In the User Interface, your developer ETH address will be automatically obtained when you are signed in to Metamask.
        </p>
        <h3 id="question_8">What is the purpose of the Developer Metadata URL?</h3>
        <p>The Developer metadata URL will host the developer identity content. It will be a json file and will be hosted in the developer’s servers. The metadata url should be publicly accessible.  </p>
        <h3 id="question_9">What should be the contents of the metadata file?</h3>
        <p>
          The following fields are mandatory in the metadata file - Name, Organization, Street_1, City, State/Province, Postal Code, Country, Phone, Email and URL.
          <br/>
          Here is an example metadata file.
          <pre>{JSON.stringify(this.developerMetadata(), null, 2)}</pre>
        </p>
        <h3 id="question_10">Is there a service fee for this transaction?</h3>
        <p>Yes. There are two fees that need to paid for this transaction - Transaction fee + Gas fee. You can retrieve, the transaction fees for each transaction directly from the smart contract. In the UI this will be done automatically and you can pay the fees via Metamask. The gas fees are applicable for all Ethereum write transactions. You can set this fee in Metamask.</p>
        <h3 id="question_11">Why are there multiple Metamask approvals in this transaction?</h3>
        <p>The smart contract handles the payment and the registration process as two distinct entities - payment & registration. The two confirmations are for these two processes. </p>

        <h2 id="bot_registration">Bot Registration</h2>

        <h3 id="question_12">What are the prerequisites for this transaction?</h3>
        <p>You should be an approved Botchain developer to register a product or a service. </p>
        <h3 id="question_13">What are the required parameters to register a bot or an AI Product?</h3>
        <p>
          There are 4 required parameters:<br/>
          <ul>
            <li>ETH address of the developer</li>
            <li>ETH address of the bot</li>
            <li>Bot Metadata URL</li>
            <li>Bot Metadata in JSON format</li>
          </ul>
          <br/>
          In the User Interface, your developer ETH address will be automatically obtained when you are signed in to Metamask.
          <br/>
          The Bot ETH address has to be manually input.
        </p>
        <h3 id="question_14">What is the purpose of the Bot Metadata URL?</h3>
        <p>The Bot metadata URL will host the bot identity content. It will be a json file and will be hosted in the developer’s servers. The metadata url should be publicly accessible.</p>
        <h3 id="question_15">What should be the contents of the Bot metadata file?</h3>
        <p>
          The following fields are mandatory in the metadata file - Name, Developer ID, Description, Tags.
          <br/>
          Here is an example metadata file.
          <pre>{JSON.stringify(this.botMetadata(), null, 2)}</pre>
        </p>
        <h3 id="question_16">Is there a service fee for this transaction?</h3>
        <p>Yes. There are two fees that need to paid for this transaction - Transaction fee + Gas fee. You can retrieve, the transaction fees for each transaction directly from the smart contract. In the UI this will be done automatically and you can pay the fees via Metamask. The gas fees are applicable for all Ethereum write transactions. You can set this fee in Metamask.</p>
        <h3 id="question_17">Why are there multiple Metamask approvals in this transaction?</h3>
        <p>The smart contract handles the payment and the registration process as two distinct entities - payment & registration. The two confirmations are for these two processes.</p>

        <h2>Search</h2>

        <h3 id="question_18">What can you do with Botchain UI Search?</h3>
        <p>You can search for all bots registered in the Botchain Registry. You can search by names, keywords, tags or even metadata. The results will be displayed in the order of relevance and will have all public content provided by the bot developer.</p>
        <h3 id="question_19">Is there a service fee for this transaction?</h3>
        <p>Yes. There are two fees that need to paid for this transaction - Transaction fee + Gas fee. In the UI you can pay the fees via Metamask. The gas fees are applicable for all Ethereum write transactions. You can set this fee in Metamask.</p>

      </div>
    )
  }
}

export default FaqPage
