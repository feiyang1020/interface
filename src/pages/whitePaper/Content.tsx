import { DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"

const _html = `<div class="container"><p class="MsoNormal"></p><p style="text-align:center;" class="MsoNormal" align="center"><strong><span style="font-size:18ptpx">Bitmodel: Tracing AI Contributions with Bitcoin Virtual Machine</span></strong></p><p class="MsoNormal"> </p><p style="text-align:center;" class="p" align="center"><span style="font-size:12ptpx">Bitmodel DAO</span></p><p style="text-align:center;" class="p" align="center"><span style="color:#0563c1"><a href="mailto:bitmodelai@gmail.com">bitmodelai@gmail.com</a></span></p><p style="text-align:center;" class="p" align="center"><span style="font-size:12ptpx">January 08, 2024</span></p><p class="MsoNormal"> </p><p class="MsoNormal"><span style="font-size:12ptpx">Abstract</span></p><p class="MsoNormal"> </p><p class="MsoNormal"><span style="font-size:12ptpx">Artificial Intelligence (AI) is profoundly shaping industries and transforming economies. But there are still many fundamental factors constraining the sound development of AI, such as the ambiguous value of data properties in AI models, the unclear relationship of model inheritance in deployed applications, and inappropriately-recognized contributions of developers and researchers for open sources. In our view, the absence of canonical infrastructures that are capable of formalizing the value chain of AI contributions is the crux of existing dilemmas. Taking advantage of Bitcoin Virtual Machine (BVM) in UTXO-based blockchains, we propose a brand-new solution in this paper to address these issues arising in AI. We first grow the entire AI ecosystem via a scalable blockchain with layer-1 smart contract, in the sense that data, compute power, models, applications, and such related ingredients are all built on-chain on a decentralized open-source platform with economic incentives called Bitmodel. &nbsp;Contributions on Bitmodel are dynamically traced with contribution flows that systematically recognize specific contributions from different contributors. &nbsp;We then monetize contribution flows with on-chain smart contract, thus formalizing monetary gains of the whole chain for tasks and applications. Moreover, Bitmodel proposes two financial paradigms for token raising of model development and token launch of model monetization: Initial Model Investment (IMI) and Initial Model Offering (IMO). Powered by BVM, therefore, Bitmodel is capable of rationalizing diverse contributions by monetizing entire workflows in AI, shedding light on constructing more powerful infrastructures capable of adapting to the new era of AI-driven technologies.</span></p><p class="MsoNormal"> </p><p class="MsoNormal"> </p><p class="MsoNormal"> </p><p class="MsoNormal"><span style="font-size:14ptpx">1 Introduction </span></p><p class="MsoNormal"><span style="font-size:10ptpx">The field of Artificial Intelligence (AI) has witnessed remarkable progress in re- cent years, driven by advancements in deep learning algorithms [3] and the avail- ability of massive datasets. These breakthroughs have led to the development of intelligent systems capable of performing complex tasks, from image recognition and natural language processing to autonomous decision-making, robotic con- trol, and content generation. However, despite these significant strides, several key challenges continue to hinder the widespread adoption and scalability of AI solutions. </span></p><p class="MsoNormal"></p><p class="MsoNormal"><span style="font-size:10ptpx">One of the most pressing challenges in AI development is the data bottleneck. Training effective AI models often requires access to vast amounts of high-quality data, which can be expensive, time-consuming, and ethically complex to collect, store, and manage. Additionally, the compute power required to train and run complex AI models can be significant, placing a strain on traditional centralized computing resources. Furthermore, the black-box nature of certain AI models raises concerns about explainability, transparency, and potential biases. The lack of standardization in AI models and the limited pool of qualified developers further hinder collaboration and innovation within the field. </span></p><p class="MsoNormal"><span style="font-size:10ptpx">Blockchain technology, with its core principles of decentralization, immutability, and transparency, presents a unique opportunity to address these shortcom- ings in AI development. By leveraging a distributed ledger system, blockchains can facilitate the secure and efficient sharing of data between various stake- holders, alleviating the data bottleneck and fostering collaboration. Further- more, blockchain-based platforms can provide access to decentralized comput- ing resources, reducing reliance on centralized infrastructure and potentially lowering the computational costs associated with training and running AI mod- els. The inherent transparency of blockchain technology can also enhance the explainability and traceability of AI models, allowing for better understand- ing of decision-making processes and mitigating potential biases. Additionally, blockchain-based solutions can promote standardization within the AI ecosys- tem by establishing secure and transparent protocols for data exchange and model deployment. Finally, by creating a collaborative environment that in- centivizes participation, blockchain technology has the potential to democratize AI development, attracting a wider pool of developers and fostering innovation across the field. </span></p><p class="MsoNormal"><span style="font-size:10ptpx">This paper introduces Bitmodel, an open-source platform designed to ex- plore the potential of blockchain technology in addressing key challenges hinder- ing AI advancement and adoption. Bitmodel leverages a UTXO-based blockchain with Bitcoin Virtual Machine (BVM) to create an AI ecosystem with a robust economic foundation. BVM empowers layer-1 smart contracts to facilitate the monetization of this ecosystem. Bitmodel innovatively introduces a contribution flow concept, which tracks the derivative relationships between all components within the model ecosystem and is permanently recorded on-chain. Token re- wards are then allocated proportionally based on this quantifiable and verifiable contribution flow, managed by smart contracts. Building upon this on-chain economic model, Bitmodel proposes two paradigms for model development and monetization: Initial Model Investment (IMI) and Initial Model Offering (IMO). IMI allows developers to raise Bitmodel tokens for projects demonstrably ready for algorithmic and model framework implementation. IMO, akin to an Ini- tial Public Offering (IPO) in traditional finance, enables competitive projects or models to launch their tokens. Individual model owners can launch their tokens upon achieving demonstrably superior performance within the commu- nity. This paper delves into how blockchain-based approaches can alleviate data bottlenecks, optimize compute resource utilization, enhance AI model explain- ability and transparency, promote standardization, and expand the AI developer pool. Through a comprehensive analysis of existing research and the develop- ment of novel blockchain-powered solutions, Bitmodel aims to contribute to the responsible and sustainable development of AI by harnessing the transformative potential of the foundational bitcoin protocol. </span></p><p class="MsoNormal"> </p><p class="p"><span style="font-size:14ptpx">2 Bitmodel Blockchain </span></p><p class="p"><span style="font-size:10ptpx">Bitmodel blockchain is based on the protocol of the original Bitcoin blockchain. We enable all the script opcodes for Bitcoin Virtual Machine, which is the core feature of Bitmodel blockchain. </span></p><p class="p"><span style="font-size:12ptpx">2.1 Bitcoin Virtual Machine </span></p><p class="p"><span style="font-size:10ptpx">Virtual machines are the cores of blockchains, because nearly all the applica- tions need smart contracts of virtual machines to be successful. The Bitcoin Virtual Machine (BVM) and Ethereum Virtual Machine (EVM) [1] stand as seminal innovations within the blockchain domain, each embodying unique ap- proaches to executing smart contracts and decentralized applications (dApps). BVM, renowned for its originality, leverages bitcoin protocol to provide a secure and decentralized environment for executing scripts directly on the blockchain. Unlike traditional virtual machines, BVM operates within the constraints of bitcoin consensus mechanism and scripting language, enabling trustless execu- tion of code with a focus on simplicity and security. On the other hand, EVM, introduced by Ethereum, pioneered the concept of Turing completeness within blockchain smart contracts, allowing for greater flexibility and expressive power in executing decentralized applications. However, while EVM offers versatil- ity, it also faces challenges regarding scalability due to its design, as Ethereum must process every computation from every smart contract in a certain order, leading to potential bottlenecks during periods of high demand. In contrast, BVM exhibits a unique advantage in scalability due to its UTXO-based archi- tecture, where transactions are treated as discrete entities, allowing for parallel processing and efficient scaling. This scalability property of BVM positions it as a formidable platform for decentralized innovation, particularly in scenarios requiring high transaction throughput or complex computations. The spectrum of utilization for BVM spans diverse sectors, including decentralized finance (DeFi), supply chain management, digital identity, and voting systems, where its scalability ensures robust performance even under heavy usage. Furthermore, BVM’s compatibility with Bitcoin’s existing infrastructure offers additional ben- efits, leveraging the network effects and security of the world’s most resilient blockchain. As blockchain technology continues to evolve, the advantages of BVM in scalability and performance underscore its significance in driving for- ward the next wave of decentralized applications and transformative blockchain solutions. </span></p><p class="p"><span style="font-size:12ptpx">2.2 Bitmodel Blockchain with Layer-1 Smart Contract </span></p><p class="p"><span style="font-size:10ptpx">To realize the vision of decentralized AI, we require a robust public blockchain capable of handling the complexities involved. To address this need, we have designed the Bitmodel blockchain specifically for AI and broader scientific ap- plications. The Bitmodel blockchain derives from bitcoin protocol and imple- ments from MicroVisionChain (MVC) [5], which is a public blockchain protocol meticulously designed to address the widespread scalability limitations and high transaction costs that frequently hinder legacy blockchain networks. Its unique architecture combines a UTXO (Unspent Transaction Output) model with a Proof-of-Work (PoW) consensus mechanism. The UTXO model empowers parallel transaction processing, while the PoW mechanism ensures robust security and a commitment to decentralization. These pillars work in tandem to deliver MicroVisionChain’s core promise of exceptionally high transaction throughput. Beyond its focus on scalability, MVC boasts several distinctive features. Na- tive support for layer-1 Decentralized Identifiers (DIDs) empowers users with sovereign control over their digital identities, fostering a new paradigm for data privacy and management. MVC also features powerful smart contract capabil- ities, enabling trustless automation and the creation of sophisticated decentral- ized applications (dApps) that can tap into the blockchain’s scalability. Specifi- cally, we unlock the scripting system for transactions in the original Bitcoin, i.e. a series of opcodes that are essential for a Turing-complete BVM. Integrated with context introspection and MetaTxid [12], BVM used in MVC is capable of enabling the creation of smart contracts with functionalities comparable to the Ethereum Virtual Machine (EVM). However, due to the inherent UTXO- based model of Bitcoin transactions, these smart contracts may offer greater efficiency due to their inherently discrete state. These key features position Mi- croVisionChain as a compelling infrastructure layer for a wide range of Web3 innovations. Besides the properties of MVC, Bitmodel Blockchain has its own unique features for AI applications. We are scaling the Bitmodel blockchain to encourage the storage and management of AI data on-chain. This capabil- ity will be implemented in stages, aligning with the evolution of the Bitmodel ecosystem. </span></p><p class="p"><span style="font-size:12ptpx">2.3 MetaID: Decentralized Identity with On-chain Data </span></p><p class="p"><span style="font-size:10ptpx">Leveraging a UTXO model, MetaID [4] provides a sophisticated solution for managing on-chain data in a decentralized manner. Users retain full control over the data associated with their MetaIDs, regardless of whether a specific application is enabled or disabled. This design offers several advantages for decentralized applications and platforms: 1) Comprehensive Data Preservation: Users’ historical data is securely stored and readily retrievable on the blockchain. This empowers users to interact seamlessly with various data platforms with- out being locked into specific application instances. For example, a user could freely switch between different on-chain Twitter-like applications while retain- ing access to their full data history using a single MetaID. 2) Fraud Deterrence: MetaID raises the stakes for scams and malicious behavior. Any fraudulent ac- tivity associated with a MetaID permanently marks all data linked to that iden- tifier as suspect. This acts as a powerful deterrent and significantly streamlines platform management efforts to address attacks and dishonesty. The Bitmodel blockchain, through MetaID, inherently incentivizes honest behavior by both users and applications. </span></p><p class="p"> </p><p class="MsoNormal"><span style="font-size:14ptpx">3 Rationalizing AI Contributions </span></p><p class="MsoNormal"><span style="font-size:10ptpx">We present our overall pipeline of rationalizing AI contributions in this sec- tion, including on-chain models, monetization with smart contract, and specific instances in AI. </span></p><p class="MsoNormal"></p><p class="MsoNormal"><span style="font-size:12ptpx">3.1 On-chain AI Workflows </span></p><p class="MsoNormal"><span style="font-size:10ptpx">To fully realize the potential of blockchain-driven AI workflows, it is essential to migrate both model data and operational activity data onto a dedicated blockchain platform. This strategic move offers several compelling advantages: </span></p><p style="text-indent:2em;" class="MsoNormal"><span style="font-size:10ptpx">·</span> <span style="font-size:10ptpx">Seamless Interoperability: By unifying diverse data types within a single blockchain environment, we break down silos and promote seamless in- teroperability between different databases, AI models, and related data assets. This lays the foundation for standardized data manipulation pro- tocols, fostering greater efficiency and collaboration across the AI devel- opment lifecycle. </span></p><p style="text-indent:2em;" class="MsoNormal"><span style="font-size:10ptpx">·</span> <span style="font-size:10ptpx">Value Quantification and Monetization: Storing data on-chain enables us to leverage the blockchain’s native token as a unified metric to quantify the value of data assets. This facilitates transparent monetization strategies within the AI ecosystem, rewarding data contributors and model creators in a fair and equitable manner. </span></p><p style="text-indent:2em;" class="MsoNormal"><span style="font-size:10ptpx">·</span> <span style="font-size:10ptpx">Automated Reward Distribution: The power of blockchain-based smart contracts allows us to automate the distribution of rewards or interests throughout the entire model network. This ensures that all stakeholders – from data providers to model developers – are incentivized and compen- sated for their contributions, ultimately driving innovation and sustain- ability within the AI landscape. </span></p><p style="text-indent:2em;" class="MsoNormal"><span style="font-size:10ptpx">·</span> <span style="font-size:10ptpx">Enhanced Transparency and Accountability: On-chain models and data introduce a new level of transparency and accountability to the AI com- munity. Every transaction and model update leaves an immutable trail on the blockchain, providing verifiable checkpoints that aid in auditing, debugging, and establishing trust in AI-powered systems. </span></p><p class="MsoNormal"><span style="font-size:10ptpx">Furthermore, the unique properties of Bitmodel’s UTXO architecture make it particularly well-suited for the demands of AI workflows. Its ability to effi- ciently handle parallel data transactions ensures scalability and supports the computational load of an active AI platform. </span></p><p class="MsoNormal"></p><div class="media-wrap image-wrap"><img src="file:////Users/liuhaihua/Library/Containers/com.kingsoft.wpsoffice.mac.global/Data/tmp/wps-liuhaihua/ksohtml//wps6.png"></div><p> </p><p style="text-align:center;" class="p" align="center"><span style="font-size:10ptpx">Figure 3: Model flow.</span></p><p class="MsoNormal"><span style="font-size:12ptpx">3.2 Monetizing Workflows via Smart Contract </span></p><p class="MsoNormal"><span style="font-size:10ptpx">With all platform data securely residing on-chain, we can harness the versatil- ity of Bitmodel’s smart contracts to implement diverse monetization strategies tailored to the intricate workflows of AI development. These contracts enable us to precisely define reward mechanisms for each type of contribution to an AI model’s lifecycle. Whether it’s providing high-quality training data, refining an algorithm’s architecture, or deploying a model for real-world applications, the value of each input and action can be quantified and rewarded accordingly. This reward system, fully integrated with the blockchain’s native token, ensures fairness and transparency in the distribution of incentives. </span></p><p class="MsoNormal"><span style="font-size:10ptpx">To be specific, we have five sources to support the success of one task, as shown in Figure 2(a). Suppose that the task reward is R and the reward for the i-th supportive source is w</span><span style="font-size:7ptpx">i</span><span style="font-size:10ptpx">R, where w</span><span style="font-size:7ptpx">i </span><span style="font-size:10ptpx">∈ [0,1] is the weight of being rewarded and the sume of w</span><span style="font-size:7ptpx">i</span><span style="font-size:10ptpx">&nbsp;is one. The w</span><span style="font-size:7ptpx">i </span><span style="font-size:10ptpx">is the reward percentage of source i pertaining to the task. By means of smart contracts of Bitmodel mainnet, w</span><span style="font-size:7ptpx">i </span><span style="font-size:10ptpx">can be realized on-chain with script language for BVM. A more concrete example is illustrated in Figure 2(b), where developing a model needs the support of databases, compute power, dependent models, researchers’ contributions, and software infrastructure. Actually, each resource can stem from different ways. Bitmodel mainnet is capable of supporting the effective construction of such a complex economic system. </span></p><p class="MsoNormal"><span style="font-size:10ptpx">Moreover, the innate programmability of smart contracts allows for dynamic adjustment of reward allocation criteria. This flexibility is crucial in the rapidly evolving domain of AI, where the relative importance of data, models, and</span> <span style="font-size:10ptpx">computational resources may shift over time. By having such a transparent, on-chain system, we foster trust and collaboration within the AI community. Stakeholders can confidently participate, knowing that their contributions will be recognized and rewarded in a verifiable and equitable manner. We envision this robust rewards mechanism as a powerful catalyst for decentralizing AI re- search and development, attracting a wider range of talent and resources to fuel innovation in the field. </span></p><p class="MsoNormal"> </p><p class="p"><span style="font-size:14ptpx">4 Model Network </span></p><p class="p"><span style="font-size:10ptpx">AI applications are heavily reliant on models, particularly foundation models such as GPT [9], Stable Diffusion (SD) [10], Sora [7], and others. These foun- dation models often build upon numerous preceding models and algorithms, creating intricate contribution flows that are central to the functioning of AI sys- tems. However, within the current commercial framework, only the foundation models or those offered as services tend to generate income, while the contribu- tions stemming from related algorithms remain largely unaccounted for. This commercialization model fails to accurately reflect the full spectrum of contri- butions required for an AI product’s development and deployment. To address this disparity, it becomes imperative to delve deeper into the construction of contribution flows associated with models, thereby ensuring that all contribu- tors are appropriately recognized and rewarded for their role in advancing AI technologies. </span></p><p class="p"><span style="font-size:12ptpx">4.1 Growing Model Network </span></p><p class="p"><span style="font-size:10ptpx">In the realm of artificial intelligence (AI) development, the intricate web of re- lationships between various models is fundamental in shaping the functionality and performance of AI systems. Tasks within the AI ecosystem often rely on multiple related models, thereby facilitating the construction of contribution flows that effectively illustrate the interdependencies between different compo- nents. For contributors on platforms like Bitmodel, the process of identifying and labeling models or algorithms directly utilized in their published AI models serves as a pivotal step in catalyzing the dynamic formation of a model network. This network functions as a comprehensive repository of the dependencies and interactions between different models within the AI ecosystem, providing invalu- able insights into the contributions of individual models. Despite the inherent complexity and challenges associated with constructing this model network, the innovative mechanisms embedded within the Bitmodel platform offer promis- ing solutions for tracing and attributing contributions across a diverse array of interconnected models. This capability not only enhances transparency and accountability within the AI community but also fosters greater collaboration and innovation, thereby propelling the advancement of AI technologies to new heights. </span></p><p class="p"><span style="font-size:10ptpx">The establishment of a robust model network within Bitmodel holds im- mense promise for revolutionizing the way in which value is attributed and compensated within the AI landscape. By providing a transparent and equitable framework for capturing and formalizing contribution flows, Bitmodel ensures that all contributors receive fair recognition and compensation for their contri- butions. This incentivizes greater collaboration and innovation within the AI community and fosters a more equitable distribution of rewards across the entire ecosystem. Moreover, the model network serves as a foundational framework for the development of more equitable and transparent compensation mechanisms, leveraging the capabilities of blockchain technology to ensure a rational allo- cation mechanism for contributors. While the realization of this functionality presents challenges, particularly in terms of infrastructure development, the AI community eagerly anticipates the implementation of such mechanisms to ad- dress the existing flaws in AI commercialization. Through continued innovation and collaboration, platforms like Bitmodel pave the way for a more equitable and transparent future for AI development and deployment, driving progress in the field and fostering greater inclusivity within the AI ecosystem. </span></p><p class="p"><span style="font-size:12ptpx">4.2 Model Network Dynamics </span></p><p class="p"><span style="font-size:10ptpx">The model network that will be constructed on Bitmodel is anticipated to evolve into a fascinatingly complex network, akin to the structure of Mandala net- works [2]. Mandala networks exhibit a hierarchical distribution of degrees for nodes, wherein most nodes emanate from a few pivotal dominant nodes in a tree-like fashion, albeit not strictly adhering to a tree structure. Such networks are ubiquitous in various fields of science and real-world connections, demon- strating their relevance and applicability across diverse domains. The proper- ties exhibited by Mandala networks closely mirror those anticipated within the model network framework in AI. In AI, many models rely on fundamental algo- rithms inherent to frameworks and backbones. For instance, foundation models like GPT in NLP and Stable Diffusion [10] in computer vision leverage algo- rithms such as Transformer [11] and Variational Autoencoder, as illustrated in Figure 3. In the incentive mechanism proposed on Bitmodel, these fundamen- tal algorithms serve as the cornerstone of the AI ecosystem, thereby garnering significant benefits within the system. Consequently, researchers focusing on foundational research stand to receive substantial rewards, thereby incentivizing innovation within the platform. Leveraging the properties of Mandala networks, the model network within Bitmodel can be subjected to thorough analysis to elucidate its intrinsic properties and dynamics. The anticipated results from such analyses hold promise for providing valuable insights into the evolution and behavior of the model network within the thriving ecosystem of Bitmodel. </span></p><p class="p"><span style="font-size:12ptpx">4.3 Restricted Open-source Solution </span></p><p class="p"><span style="font-size:10ptpx">In the context of AI ecosystems incentivized by economic rewards, such as Bitmodel, certain contributors may opt to confine the usage of their models solely within the platform, effectively prohibiting their models from being freely downloaded. The rationale behind this restriction stems from the fact that the ecosystem associated with these models is intricately intertwined with Bit- Model’s infrastructure, potentially leading to enhanced rewards for contributors through the contribution flow. Consequently, there arises a compelling need for a restricted open-source solution to accommodate such requirements and ensure the integrity of the ecosystem. </span></p><p class="p"><span style="font-size:10ptpx">One direct method to address this requirement is by encrypting the entire set of model parameters for a specific model before loading it onto the blockchain. In this approach, both the contributor and the platform collaborate to man- age the private key associated with the encryption process. While the model remains accessible and operable within the Bitmodel platform, it becomes inac- cessible if downloaded from the storage blockchain but not utilized within the platform. While this solution offers feasibility, it encounters challenges, particu- larly concerning the voluminous nature of parameters in foundation models. For instance, the basic version of Stable Diffusion surpasses 3GB in size, rendering the encryption of model parameters a time-consuming endeavor, which may be impractical for AI platforms catering to millions of developers. </span></p><p class="p"><span style="font-size:10ptpx">In response to this challenge, we propose a simple yet sophisticated approach. A fraction of model parameters is randomly sampled from the entire parameter set, and these selected parameters are then randomly inserted into various lo- cations within the model. Only the positions of the selected parameters within the model and their respective insertion points require encryption. Given that only a small fraction of parameters needs to be encrypted, approximately one- millionth of the total set, this approach enables efficient implementation of en- cryption. The adoption of a restricted open-source solution is imperative for an AI platform incentivized by economic rewards, underscoring its significance within such ecosystems and reinforcing the platform’s integrity. </span></p><p class="p"><span style="font-size:12ptpx">4.4 Model Investing and Offering </span></p><p class="p"><span style="font-size:10ptpx">Bitmodel fosters a unique ecosystem for open-sourced models, characterized by a two-stage life cycle that incentivizes both innovation and collaboration. This section delves into the intricacies of this life cycle. </span></p><p class="p"><span style="font-size:10ptpx">The initial stage, termed Initial Model Investing (IMI), addresses the fundamental challenge of resource scarcity in model development. Many devel- opers lack the necessary computational power and high-quality data required to train large models, often due to the prohibitive costs involved. Bitmodel provides a solution through IMI, enabling users to invest tokens on specific algorithmic tasks that address their needs. These tasks serve as prompts for developers, who can then leverage their expertise to develop models that solve the identified problems. The IMI process encourages community participation by allowing users to directly contribute to model development. By investing tokens on specific tasks, users signal their interest in particular functionalities and incentivize developers to focus their efforts on addressing those needs. </span></p><p class="p"><span style="font-size:10ptpx">Once developers have successfully trained models that address the proposed IMI tasks, they can release their models through the Bitmodel platform. This marks the beginning of the second stage in the life cycle, known as the Ini- tial Model Offering (IMO). In the IMO stage, developers may offer specific tokens associated with their models, provided that the models meet certain cri- teria established by the community. These criteria typically involve the model’s ability to be deployed for real-world commercial applications or its significant influence within the AI community. High-quality models released through the IMO process are eligible for the implementation of model-specific tokenomics. This enables developers to establish a self-sustaining economic system around their models, allowing them to capture a portion of the value generated by their creation. This incentivizes continued innovation and ensures that developers are fairly compensated for their contributions. </span></p><p class="p"><span style="font-size:10ptpx">These two-stage operations, IMI and IMO, represent innovative solutions supported by blockchain technologies that aim to democratize AI development. By providing a platform for open-sourced models, community-driven invest- ment, and fair compensation mechanisms, Bitmodel empowers developers and users to contribute to the advancement of AI in a collaborative and equitable manner, thus democratizing AI through blockchain technology. </span></p><p class="p"><span style="font-size:14ptpx">5 Conclusion </span></p><p class="p"><span style="font-size:10ptpx">In conclusion, the fusion of blockchain technology with AI development repre- sents a paradigm shift with profound implications for addressing key challenges in the field. By leveraging the decentralized, transparent, and immutable nature of blockchain, platforms like Bitmodel offer innovative solutions to longstanding issues such as the data bottleneck, compute power utilization, model explainabil- ity, standardization, and collaboration. Through the establishment of a model network within Bitmodel, stakeholders can benefit from enhanced transparency, accountability, and collaboration, ultimately driving progress and innovation in AI research and development. The integration of smart contracts enables dy- namic reward allocation mechanisms, ensuring fair compensation for contribu- tors and fostering a more inclusive and equitable AI ecosystem. Furthermore, the inherent programmability of smart contracts allows for the adaptation of reward allocation criteria to reflect the evolving landscape of AI development. In addressing the challenge of restricted model access, Bitmodel proposes an elegant solution involving parameter encryption. This approach, while ensuring model integrity within the platform, minimizes encryption overhead by sam- pling and encrypting a fraction of model parameters. This strategy maintains the feasibility of encryption, vital for an AI platform catering to millions of devel- opers. As the Bitmodel ecosystem continues to evolve and prosper, it holds the potential to revolutionize the way value is attributed and compensated within the AI landscape, paving the way for a more transparent, collaborative, and sustainable future. Through continued innovation and collaboration, platforms like Bitmodel will play a pivotal role in driving the responsible and inclusive development of AI technologies, ultimately benefiting society as a whole. </span></p><p class="MsoNormal"> </p><p class="p"><span style="font-size:14ptpx">References </span></p><p class="p"><span style="font-size:10ptpx">[1]  V. Buterin. Ethereum whitepaper. https://ethereum.org/en/whitepaper, 2014. </span></p><p class="p"><span style="font-size:10ptpx">[2]  C. I. N. S. Filho, A. A. Moreira, R. F. S. Andrade, H. J. Herrmann, and J. S. A. Jr. Mandala networks: ultra-small-world and highly sparse graphs. Scientific Reports, 2015. </span></p><p class="p"><span style="font-size:10ptpx">[3]  Y. LeCun, Y. Bengio, and G. Hinton. Deep learning. nature, 521(7553):436– 444, 2015. </span></p><p class="p"><span style="font-size:10ptpx">[4]  MVCDao. MetaID. https://www.microvisionchain.com/development/metaid, 2024. </span></p><p class="p"><span style="font-size:10ptpx">[5]  MVCDao. MVC, the blockchain for web3. https://www. microvisionchain.com, January 26, 2023. </span></p><p class="p"><span style="font-size:10ptpx">[6]  S. Nakamoto. Bitcoin: A peer-to-peer electronic cash system. https: //bitcoin.org/bitcoin.pdf, October 31, 2008. </span></p><p class="p"><span style="font-size:10ptpx">[7]  OpenAI. Video generation models as world simulators. https://openai. com/index/video-generation-models-as-world-simulators, Febru- ary 15, 2024. </span></p><p class="p"><span style="font-size:10ptpx">[8]  OpenAI. ChatGPT. https://chatgpt.com, November 30, 2022. </span></p><p class="p"><span style="font-size:10ptpx">[9]  A. Radford, K. Narasimhan, T. Salimans, I. Sutskever, et al. Improving language understanding by generative pre-training, 2018. </span></p><p class="p"><span style="font-size:10ptpx">[10]  R. Rombach, A. Blattmann, D. Lorenz, P. Esser, and B. Ommer. High- resolution image synthesis with latent diffusion models. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 10684–10695, 2022. </span></p><p class="p"><span style="font-size:10ptpx">[11]  A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, L. Kaiser, and I. Polosukhin. Attention is all you need. Advances in neural information processing systems, 30, 2017. </span></p><p class="p"><span style="font-size:10ptpx">[12]  W. Zhang and J. Li. Method and apparatus for hierarchically pruning data in blockchain transaction, device and medium, May 23 2024. US Patent App. 18/543,440. </span></p><p class="MsoNormal"> </p><p class="MsoNormal"> </p><p class="MsoNormal"> </p><p class="MsoNormal"> </p><p class="MsoNormal"> </p><p class="MsoNormal"> </p></div>`
export default () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = window.location.origin + '/Bitmodel-White-Paper-2.0.pdf';
        link.download = 'Bitmodel-White-Paper-2.0.pdf';
        console.log(link)
        link.click();
    };
    return <div className="privacyContent">
        <div dangerouslySetInnerHTML={{ __html: _html }}></div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Button block key="submit1" type="primary" style={{ width: 397, height: 88, fontSize: 27, margin: '20px auto', borderRadius: 44, zIndex: 1000 }} onClick={handleDownload} iconPosition='end' icon={<DownloadOutlined />}> Download </Button>
        </div>

    </div>
}