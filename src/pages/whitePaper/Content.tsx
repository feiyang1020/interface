import { DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { MdPreview } from "md-editor-rt";
import 'md-editor-rt/lib/preview.css';

const _html = `# Bitmodel: Tracing AI Contributions with Bitcoin Virtual Machine

**Bitmodel DAO**  
Bitmodelai@gmail.com  
**January 08, 2024**

---

## Abstract

Artificial Intelligence (AI) is profoundly shaping industries and transforming economies. But there are still many fundamental factors constraining the sound development of AI, such as the ambiguous value of data properties in AI models, the unclear relationship of model inheritance in deployed applications, and inappropriately-recognized contributions of developers and researchers for open sources. In our view, the absence of canonical infrastructures that are capable of formalizing the value chain of AI contributions is the crux of existing dilemmas. Taking advantage of Bitcoin Virtual Machine (BVM) in UTXO-based blockchains, we propose a brand-new solution in this paper to address these issues arising in AI. We first grow the entire AI ecosystem via a scalable blockchain with layer-1 smart contract, in the sense that data, compute power, models, applications, and such related ingredients are all built on-chain on a decentralized platform with economic incentives called Bitmodel. Contributions on Bitmodel are dynamically traced with contribution flows (C-Flows) that systematically recognize specific contributions from different contributors. We then monetize contribution flows with on-chain smart contract, thus formalizing monetary gains of the whole chain for tasks and applications. Moreover, Bitmodel proposes two financial paradigms for token raising of model development and token launch of model monetization: Initial Model Investing (IMI) and Initial Model Offering (IMO). Powered by BVM, therefore, Bitmodel is capable of rationalizing diverse contributions by monetizing entire workflows in AI, shedding light on constructing more powerful infrastructures capable of adapting to the new era of AI-driven technologies.

- You
  - How do blockchains aid AI? Please list four items pertaining to data, compute power, models, and developers, respectively. Each item is within two sentences.
   
- ChatGPT
1. **Data**: Blockchains enable secure and transparent data sharing among multiple parties, ensuring data integrity and authenticity for AI training. Through decentralized storage and cryptographic techniques, blockchains facilitate the creation of robust datasets for training AI models while preserving privacy and preventing data tampering.
2. **Compute Power**: Blockchain networks can leverage distributed computing resources, harnessing the collective processing power of network participants for AI tasks like training complex models or executing large-scale computations. This decentralized approach democratizes access to computational resources, potentially reducing costs and accelerating AI innovation.
3. **Models**: Blockchains provide a platform for deploying and executing AI models in a decentralized manner, enabling trustless interactions between users and models without the need for intermediaries. Smart contracts on blockchains can automate model transactions, ensuring fair compensation for model usage and incentivizing model developers to continuously improve their algorithms.
4. **Developers**: Blockchain ecosystems foster communities of developers who collaborate on building AI applications, sharing models, and refining algorithms. Through tokenization and decentralized governance mechanisms, blockchains incentivize developers to contribute to AI projects, driving innovation and accelerating the development of AI solutions.
<u>(a) ChatGPT [6]</u>

  ![](https://pub-1dc659a1195e42efadf87f55cd011bd9.r2.dev/img/20241116153541_503/1sy3y601000d5nfhwyg1gm45k0ezh2ub/1ff14b79-e04d-4509-9940-7f3f959e933c.png)
>  **Prompt**: studio photograph closeup of a chameleon over a black background.
    
<u>(b) Stable Diffusion [8].</u>

![](https://pub-1dc659a1195e42efadf87f55cd011bd9.r2.dev/img/20241116154550_503/1sy3y601000d5nfpoidlhuv5m0gqsr5n/a4576cc3-5958-4933-b204-bc808335dfac.png)

> **Prompt**: This close-up shot of a Victoria crowned pigeon showcases its striking blue plumage and red chest. Its crest is made of 
delicate, lacy feathers, while its eye is a striking red color. The bird’s head is tilted slightly to the side, giving the impression of it 
looking regal and majestic. The background is blurred, drawing attention to the bird’s striking appearance.

<u>(c) Sora [5].</u>

Figure 1: AI instances 

---

## 1. Introduction

The field of Artificial Intelligence (AI) has witnessed remarkable progress in recent years, driven by advancements in deep learning algorithms and the availability of massive datasets. These breakthroughs have led to the development of intelligent systems capable of performing complex tasks, from image recognition and natural language processing to autonomous decision-making, robotic control, and content generation. However, despite these significant strides, several key challenges continue to hinder the widespread adoption and scalability of AI solutions.

One of the most pressing challenges in AI development is the data bottleneck. Training effective AI models often requires access to vast amounts of high-quality data, which can be expensive, time-consuming, and ethically complex to collect, store, and manage. Additionally, the compute power required to train and run complex AI models can be significant, placing a strain on traditional centralized computing resources. Furthermore, the black-box nature of certain AI models raises concerns about explainability, transparency, and potential biases. The lack of standardization in AI models and the limited pool of qualified developers further hinder collaboration and innovation within the field.

Blockchain technology, with its core principles of decentralization, immutability, and transparency, presents a unique opportunity to address these shortcomings in AI development. By leveraging a distributed ledger system, blockchains can facilitate the secure and efficient sharing of data between various stakeholders, alleviating the data bottleneck and fostering collaboration. Furthermore, blockchain-based platforms can provide access to decentralized computing resources, reducing reliance on centralized infrastructure and potentially lowering the computational costs associated with training and running AI models. The inherent transparency of blockchain technology can also enhance the explainability and traceability of AI models, allowing for better understanding of decision-making processes and mitigating potential biases. Additionally, blockchain-based solutions can promote standardization within the AI ecosystem by establishing secure and transparent protocols for data exchange and model deployment. Finally, by creating a collaborative environment that incentivizes participation, blockchain technology has the potential to democratize AI development, attracting a wider pool of developers and fostering innovation across the field.

This paper introduces Bitmodel, an open-source platform designed to explore the potential of blockchain technology in addressing key challenges hindering AI advancement and adoption. Bitmodel leverages a UTXO-based blockchain with Bitcoin Virtual Machine (BVM) to create an AI ecosystem with a robust economic foundation. BVM empowers layer-1 smart contracts to facilitate the monetization of this ecosystem. Bitmodel innovatively introduces a contribution flow concept, which tracks the derivative relationships between all components within the model ecosystem and is permanently recorded on-chain. Token rewards are then allocated proportionally based on this quantifiable and verifiable contribution flow, managed by smart contracts. Building upon this on-chain economic model, Bitmodel proposes two paradigms for model development and monetization: Initial Model Investing (IMI) and Initial Model Offering (IMO). IMI allows developers to raise Bitmodel tokens for projects demonstrably ready for algorithmic and model framework implementation. IMO, akin to an Initial Public Offering (IPO) in traditional finance, enables competitive projects or models to launch their tokens. Individual model owners can launch their tokens upon achieving demonstrably superior performance within the community. This paper delves into how blockchain-based approaches can alleviate data bottlenecks, optimize compute resource utilization, enhance AI model explainability and transparency, promote standardization, and expand the AI developer pool. Through a comprehensive analysis of existing research and the development of novel blockchain-powered solutions, Bitmodel aims to contribute to the responsible and sustainable development of AI by harnessing the transformative potential of the foundational bitcoin protocol.

---

## 2. Bitmodel Blockchain

Bitmodel blockchain is based on the protocol of the original Bitcoin blockchain. We enable all the script opcodes for Bitcoin Virtual Machine, which is the core feature of Bitmodel blockchain.


### 2.1 Bitcoin Virtual Machine

Virtual machines are the cores of blockchains, because nearly all the applications need smart contracts of virtual machines to be successful. The Bitcoin Virtual Machine (BVM) and Ethereum Virtual Machine (EVM) stand as seminal innovations within the blockchain domain, each embodying unique approaches to executing smart contracts and decentralized applications (dApps). BVM, renowned for its originality, leverages bitcoin protocol to provide a secure and decentralized environment for executing scripts directly on the blockchain. Unlike traditional virtual machines, BVM operates within the constraints of bitcoin consensus mechanism and scripting language, enabling trustless execution of code with a focus on simplicity and security. On the other hand, EVM, introduced by Ethereum, pioneered the concept of Turing completeness within blockchain smart contracts, allowing for greater flexibility and expressive power in executing decentralized applications. However, while EVM offers versatility, it also faces challenges regarding scalability due to its design, as Ethereum must process every computation from every smart contract in a certain order, leading to potential bottlenecks during periods of high demand. In contrast, BVM exhibits a unique advantage in scalability due to its UTXO-based architecture, where transactions are treated as discrete entities, allowing for parallel processing and efficient scaling. This scalability property of BVM positions it as a formidable platform for decentralized innovation, particularly in scenarios requiring high transaction throughput or complex computations. The spectrum of utilization for BVM spans diverse sectors, including decentralized finance (DeFi), supply chain management, digital identity, and voting systems, where its scalability ensures robust performance even under heavy usage. Furthermore, BVM’s compatibility with Bitcoin’s existing infrastructure offers additional benefits, leveraging the network effects and security of the world’s most resilient blockchain. As blockchain technology continues to evolve, the advantages of BVM in scalability and performance underscore its significance in driving forward the next wave of decentralized applications and transformative blockchain solutions.

### 2.2 Bitmodel Blockchain with Layer-1 Smart Contract

To realize the vision of decentralized AI, we require a robust public blockchain capable of handling the complexities involved. To this end, we need to build the Bitmodel blockchain specifically for AI and broader scientific applications. The Bitmodel blockchain can be designed from the bitcoin protocol and be devised from bitcoin-isomorphic blockchains, which are meticulously designed to address the widespread scalability limitations and high transaction costs that frequently hinder legacy blockchain networks. The UTXO model empowers parallel transaction processing, while the PoW mechanism ensures robust security and a commitment to decentralization. These pillars work in tandem to deliver the core promise of exceptionally high transaction throughput. Beyond its focus on scalability, the Bitmodel blockchain boasts several distinctive features. Native support for layer-1 Decentralized Identifiers (DIDs) empowers users with sovereign control over their digital identities, fostering a new paradigm for data privacy and management. The Bitmodel blockchain also features powerful layer-1 smart contract capabilities verified by miners, enabling trustless automation and the creation of sophisticated decentralized applications (dApps) that can tap into the blockchain’s scalability. Specifically, the scripting system for transactions in the original Bitcoin is unlocked, i.e. a series of op codes that are essential for a Turing-complete BVM. Therefore, BVM used in the Bitmodel blockchain is capable of enabling the creation of smart contracts with functionalities comparable to the Ethereum Virtual Machine (EVM). However, due to the inherent UTXO-based model of Bitcoin transactions, these smart contracts may offer greater efficiency due to their inherently discrete state. Besides the above properties, Bitmodel Blockchain has its own unique features for AI applications. We scale the Bitmodel blockchain with ingenious structural construction to encourage the storage and management of AI data on-chain. This capability will be implemented in stages, aligning with the evolution of the Bitmodel ecosystem. At the first stage, we can leverage bitcoin-isomorphic blockchains to satisfy our need.

---

## 3. Rationalizing AI Contributions
We present our overall pipeline of rationalizing AI contributions in this sec- tion, including on-chain models, monetization with smart contract, and specific instances in AI.

### 3.1 On-chain AI Workflows

To fully realize the potential of blockchain-driven AI workflows, it is essential to migrate both model data and operational activity data onto a dedicated blockchain platform. This strategic move offers several compelling advantages:

- **Seamless Interoperability:** By unifying diverse data types within a single blockchain environment, we break down silos and promote seamless interoperability between different databases, AI models, and related data assets. This lays the foundation for standardized data manipulation protocols, fostering greater efficiency and collaboration across the AI development lifecycle.
- **Value Quantification and Monetization:** Storing data on-chain enables us to leverage the blockchain’s native token as a unified metric to quantify the value of data assets. This facilitates transparent monetization strategies within the AI ecosystem, rewarding data contributors and model creators in a fair and equitable manner.
> On-chain interoperationality

![](https://pub-1dc659a1195e42efadf87f55cd011bd9.r2.dev/img/20241116155046_503/1sy3y601000d5nftgj0qewy5n0htz2kc/a985caa8-8f28-46d6-ba86-2d7367211344.png)
Scalable blockchain with smart contract (a)

![](https://pub-1dc659a1195e42efadf87f55cd011bd9.r2.dev/img/20241116160429_503/1sy3y601000d5ng3ysymtqb5p062n974/6fc6662b-e741-4d53-97e1-902c4ed6e6ba.png)
(b)
Figure 2: Illustration of reward distribution with Bitmodel

- **Automated Reward Distribution:** The power of blockchain-based smart contracts allows us to automate the distribution of rewards or interests throughout the entire model network. This ensures that all stakeholders – from data providers to model developers – are incentivized and compensated for their contributions, ultimately driving innovation and sustainability within the AI landscape.
- **Enhanced Transparency and Accountability:** On-chain models and data introduce a new level of transparency and accountability to the AI community. Every transaction and model update leaves an immutable trail on the blockchain, providing verifiable checkpoints that aid in auditing, debugging, and establishing trust in AI-powered systems.

Furthermore, the unique properties of Bitmodel’s UTXO architecture make it particularly well-suited for the demands of AI workflows. Its ability to efficiently handle parallel data transactions ensures scalability and supports the computational load of an active AI platform.

### 3.2 Monetizing Workflows via Smart Contract

With all platform data securely residing on-chain, we can harness the versatility of Bitmodel’s smart contracts to implement diverse monetization strategies tailored to the intricate workflows of AI development. These contracts enable us to precisely define reward mechanisms for each type of contribution to an AI model’s lifecycle. Whether it’s providing high-quality training data, refining an algorithm’s architecture, or deploying a model for real-world applications, the value of each input and action can be quantified and rewarded accordingly. This reward system, fully integrated with the blockchain’s native token, ensures fairness and transparency in the distribution of incentives.

To be specific, we have five sources to support the success of one task, as shown in Figure 2(a). Suppose that the task reward is R and the reward for the i-th supportive source is wiR, where wi ∈ [0, 1] is the weight of being rewarded and Σ wi = 1. The wi is the reward percentage of source i pertaining to the task. By means of smart contracts of Bitmodel mainnet, wi can be realized on-chain with script language for BVM. A more concrete example is illustrated in Figure 2(b), where developing a model needs the support of databases, compute power, dependent models, researchers’ contributions, and software infrastructure. Actually, each resource can stem from different ways. Bitmodel mainnet is capable of supporting the effective construction of such a complex economic system.

Moreover, the innate programmability of smart contracts allows for dynamic adjustment of reward allocation criteria. This flexibility is crucial in the rapidly evolving domain of AI, where the relative importance of data, models, and computational resources may shift over time. By having such a transparent, on-chain system, we foster trust and collaboration within the AI community. Stakeholders can confidently participate, knowing that their contributions will be recognized and rewarded in a verifiable and equitable manner. We envision this robust rewards mechanism as a powerful catalyst for decentralizing AI research and development, attracting a wider range of talent and resources to fuel innovation in the field.

---

## 4. Model Network
AI applications are heavily reliant on models, particularly foundation models such as GPT [7], Stable Diffusion (SD) [8], Sora [5], and others. These foun- dation models often build upon numerous preceding models and algorithms, creating intricate contribution flows that are central to the functioning of AI sys- tems. However, within the current commercial framework, only the foundation models or those offered as services tend to generate income, while the contribu- tions stemming from related algorithms remain largely unaccounted for. This commercialization model fails to accurately reflect the full spectrum of contributions required for an AI product’s development and deployment. To address this disparity, it becomes imperative to delve deeper into the construction of contribution flows associated with models, thereby ensuring that all contribu- tors are appropriately recognized and rewarded for their role in advancing AI technologies.
![](https://pub-1dc659a1195e42efadf87f55cd011bd9.r2.dev/img/20241116160811_503/1sy3y601000d5ng6smjrfpi5q0u98l1i/ec329e4b-eb05-420b-8b75-ed169ce74f2b.png)
Figure 3: Contribution flows for models.


### 4.1 Growing Model Network

In the realm of artificial intelligence (AI) development, the intricate web of relationships between various models is fundamental in shaping the functionality and performance of AI systems. Tasks within the AI ecosystem often rely on multiple related models, thereby facilitating the construction of contribution flows that effectively illustrate the interdependencies between different components. For contributors on platforms like Bitmodel, the process of identifying and labeling models or algorithms directly utilized in their published AI models serves as a pivotal step in catalyzing the dynamic formation of a model network. This network functions as a comprehensive repository of the dependencies and interactions between different models within the AI ecosystem, providing invaluable insights into the contributions of individual models. Despite the inherent complexity and challenges associated with constructing this model network, the innovative mechanisms embedded within the Bitmodel platform offer promising solutions for tracing and attributing contributions across a diverse array of interconnected models. This capability not only enhances transparency and accountability within the AI community but also fosters greater collaboration and innovation, thereby propelling the advancement of AI technologies to new heights.

The establishment of a robust model network within Bitmodel holds immense promise for revolutionizing the way in which value is attributed and compensated within the AI landscape. By providing a transparent and equitable framework for capturing and formalizing contribution flows, Bitmodel ensures that all contributors receive fair recognition and compensation for their contributions. This incentivizes greater collaboration and innovation within the AI community and fosters a more equitable distribution of rewards across the entire ecosystem. Moreover, the model network serves as a foundational framework for the development of more equitable and transparent compensation mechanisms, leveraging the capabilities of blockchain technology to ensure a rational allocation mechanism for contributors. While the realization of this functionality presents challenges, particularly in terms of infrastructure development, the AI community eagerly anticipates the implementation of such mechanisms to address the existing flaws in AI commercialization. Through continued innovation and collaboration, platforms like Bitmodel pave the way for a more equitable and transparent future for AI development and deployment, driving progress in the field and fostering greater inclusivity within the AI ecosystem.

### 4.2 Model Network Dynamics

The model network that will be constructed on Bitmodel is anticipated to evolve into a fascinatingly complex network, akin to the structure of Mandala networks. Mandala networks exhibit a hierarchical distribution of degrees for nodes, wherein most nodes emanate from a few pivotal dominant nodes in a tree-like fashion, albeit not strictly adhering to a tree structure. Such networks are ubiquitous in various fields of science and real-world connections, demonstrating their relevance and applicability across diverse domains. The properties exhibited by Mandala networks closely mirror those anticipated within the model network framework in AI. In AI, many models rely on fundamental algorithms inherent to frameworks and backbones. For instance, foundation models like GPT in NLP and Stable Diffusion in computer vision leverage algorithms such as Transformer and Variational Autoencoder, as illustrated in Figure 3. In the incentive mechanism proposed on Bitmodel, these fundamental algorithms serve as the cornerstone of the AI ecosystem, thereby garnering significant benefits within the system. Consequently, researchers focusing on foundational research stand to receive substantial rewards, thereby incentivizing innovation within the platform. Leveraging the properties of Mandala networks, the model network within Bitmodel can be subjected to thorough analysis to elucidate its intrinsic properties and dynamics. The anticipated results from such analyses hold promise for providing valuable insights into the evolution and behavior of the model network within the thriving ecosystem of Bitmodel.

### 4.3 Restricted Open-source Solution

In the context of AI ecosystems incentivized by economic rewards, such as Bitmodel, certain contributors may opt to confine the usage of their models solely within the platform, effectively prohibiting their models from being freely downloaded. The rationale behind this restriction stems from the fact that the ecosystem associated with these models is intricately intertwined with Bitmodel’s infrastructure, potentially leading to enhanced rewards for contributors through the contribution flow. Consequently, there arises a compelling need for a restricted open-source solution to accommodate such requirements and ensure the integrity of the ecosystem.

One direct method to address this requirement is by encrypting the entire set of model parameters for a specific model before loading it onto the blockchain. In this approach, both the contributor and the platform collaborate to manage the private key associated with the encryption process. While the model remains accessible and operable within the Bitmodel platform, it becomes inaccessible if downloaded from the storage blockchain but not utilized within the platform. While this solution offers feasibility, it encounters challenges, particularly concerning the voluminous nature of parameters in foundation models. For instance, the basic version of Stable Diffusion surpasses 3GB in size, rendering the encryption of model parameters a time-consuming endeavor, which may be impractical for AI platforms catering to millions of developers.

In response to this challenge, we propose a simple yet sophisticated approach. A fraction of model parameters is randomly sampled from the entire parameter set, and these selected parameters are then randomly inserted into various locations within the model. Only the positions of the selected parameters within the model and their respective insertion points require encryption. Given that only a small fraction of parameters needs to be encrypted, approximately one-millionth of the total set, this approach enables efficient implementation of encryption. The adoption of a restricted open-source solution is imperative for an AI platform incentivized by economic rewards, underscoring its significance within such ecosystems and reinforcing the platform’s integrity.

### 4.4 Model Investing and Offering

Bitmodel fosters a unique ecosystem for open-sourced models, characterized by a two-stage life cycle that incentivizes both innovation and collaboration. This section delves into the intricacies of this life cycle.

The initial stage, termed Initial Model Investing (IMI), addresses the fundamental challenge of resource scarcity in model development. Many developers lack the necessary computational power and high-quality data required to train large models, often due to the prohibitive costs involved. Bitmodel provides a solution through IMI, enabling users to invest tokens on specific algorithmic tasks that address their needs. These tasks serve as prompts for developers, who can then leverage their expertise to develop models that solve the identified problems. The IMI process encourages community participation by allowing users to directly contribute to model development. By investing tokens on specific tasks, users signal their interest in particular functionalities and incentivize developers to focus their efforts on addressing those needs.

Once developers have successfully trained models that address the proposed IMI tasks, they can release their models through the Bitmodel platform. This marks the beginning of the second stage in the life cycle, known as the Initial Model Offering (IMO). In the IMO stage, developers may offer specific tokens associated with their models, provided that the models meet certain criteria established by the community. These criteria typically involve the model’s ability to be deployed for real-world commercial applications or its significant influence within the AI community. High-quality models released through the IMO process are eligible for the implementation of model-specific tokenomics. This enables developers to establish a self-sustaining economic system around their models, allowing them to capture a portion of the value generated by their creation. This incentivizes continued innovation and ensures that developers are fairly compensated for their contributions.

These two-stage operations, IMI and IMO, represent innovative solutions supported by blockchain technologies that aim to democratize AI development. By providing a platform for open-sourced models, community-driven investment, and fair compensation mechanisms, Bitmodel empowers developers and users to contribute to the advancement of AI in a collaborative and equitable manner, thus democratizing AI through blockchain technology.

---

## 5. Conclusion

In conclusion, the fusion of blockchain technology with AI development represents a paradigm shift with profound implications for addressing key challenges in the field. By leveraging the decentralized, transparent, and immutable nature of blockchain, platforms like Bitmodel offer innovative solutions to longstanding issues such as the data bottleneck, compute power utilization, model explainability, standardization, and collaboration. Through the establishment of a model network within Bitmodel, stakeholders can benefit from enhanced transparency, accountability, and collaboration, ultimately driving progress and innovation in AI research and development. The integration of smart contracts enables dynamic reward allocation mechanisms, ensuring fair compensation for contributors and fostering a more inclusive and equitable AI ecosystem. Furthermore, the inherent programmability of smart contracts allows for the adaptation of reward allocation criteria to reflect the evolving landscape of AI development. In addressing the challenge of restricted model access, Bitmodel proposes an elegant solution involving parameter encryption. This approach, while ensuring model integrity within the platform, minimizes encryption overhead by sampling and encrypting a fraction of model parameters. This strategy maintains the feasibility of encryption, vital for an AI platform catering to millions of developers. As the Bitmodel ecosystem continues to evolve and prosper, it holds the potential to revolutionize the way value is attributed and compensated within the AI landscape, paving the way for a more transparent, collaborative, and sustainable future. Through continued innovation and collaboration, platforms like Bitmodel will play a pivotal role in driving the responsible and inclusive development of AI technologies, ultimately benefiting society as a whole.

---

## References

1. V. Buterin. *Ethereum whitepaper*, 2014.
2. C. I. N. S. Filho, A. A. Moreira, R. F. S. Andrade, H. J. Herrmann, and J. S. A. Jr. *Mandala networks: ultra-small-world and highly sparse graphs*, 2015.
3. Y. LeCun, Y. Bengio, and G. Hinton. *Deep learning*, 2015.
4. S. Nakamoto. *Bitcoin: A peer-to-peer electronic cash system*, October 31, 2008.
5. OpenAI. *Video generation models as world simulators*, February 15, 2024.
6. OpenAI. *ChatGPT*, November 30, 2022.
7. A. Radford, K. Narasimhan, T. Salimans, I. Sutskever, et al. *Improving language understanding by generative pre-training*, 2018.
8. R. Rombach, A. Blattmann, D. Lorenz, P. Esser, and B. Ommer. *High-resolution image synthesis with latent diffusion models*, 2022.
9. A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, L. Kaiser, and I. Polosukhin. *Attention is all you need*, Advances in neural information processing systems, 2017.
`
export default () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = window.location.origin + '/Bitmodel-White-Paper-2.0.pdf';
        link.download = 'Bitmodel-White-Paper-2.0.pdf';
        console.log(link)
        link.click();
    };
    return <div className="privacyContent">
        <MdPreview modelValue={_html} theme="dark" language="en-US" style={{}} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button block key="submit1" type="primary" style={{ width: 397, height: 88, fontSize: 27, margin: '20px auto', borderRadius: 44, zIndex: 1000 }} onClick={handleDownload} iconPosition='end' icon={<DownloadOutlined />}> Download </Button>
        </div>

    </div>
}