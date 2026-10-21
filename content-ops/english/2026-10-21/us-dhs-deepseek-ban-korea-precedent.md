# The US Pulls DeepSeek From Federal Agencies. South Korea Got There First.

If your team pastes work documents into a free AI chatbot, you may be sending them somewhere you never agreed to.

That is the core worry behind a new US order on DeepSeek, the Chinese AI chatbot. The Department of Homeland Security (DHS) has told federal civilian agencies to stop buying DeepSeek products and to remove the ones they already run. The order became public on October 19-20, 2026. South Korea dealt with the same app 20 months earlier. Its experience shows what regulators actually found when they looked inside.

## What the US order covers

The order is titled FASCSA Exclusion and Removal Order #2026-01. FASCSA is the Federal Acquisition Supply Chain Security Act of 2018. It lets the government bar risky technology suppliers from federal purchasing after a review by the Federal Acquisition Security Council.

The order does three things:

- It bars federal civilian agencies from buying products and services from Hangzhou DeepSeek Artificial Intelligence Co. and its affiliates.
- It requires agencies to remove DeepSeek products already in their IT systems.
- It extends to third-party products built with DeepSeek's models or underlying technology.

The third point matters most. A tool from another vendor that quietly runs a DeepSeek model inside is caught too. Agencies now have to know what model sits under each AI product they use.

The issuer is DHS. It is not the Department of Defense. Social media posts called it a "Pentagon ban". That is wrong. The order applies to civilian executive agencies such as Treasury, State and Justice. It does not cover the Defense Department, and it excludes national security systems. The Pentagon acted on its own earlier. Its IT agency blocked the DeepSeek website on defense networks in January 2025. The Navy banned the app that same month. The Commerce Department barred it on staff devices in March 2025.

Agencies can ask for exceptions. Reports describe a written request within 60 days of the order, with a compelling justification, reviewed by the Cybersecurity and Infrastructure Security Agency (CISA). Some outlets note that this 60-day window, counted from the signing date, had already closed by the time the public saw the notice.

The signing date itself is disputed. The Federal Register notice and most US outlets date the order July 24, 2026. Some earlier reports gave June 26. Check the docket, DHS-2026-0628, before you quote a date.

## What it does not cover

The order is narrow in one way. It is a procurement and IT rule for federal civilian agencies. It is not a national ban.

- Private citizens in the US can still download and use DeepSeek.
- Private companies are not bound by it.
- State governments are not bound by it, although several, including New York, Tennessee and Virginia, have set their own limits on government devices.

## Why data location and prompts matter

DHS cited "multiple threat vectors". The main one is data. DeepSeek stores user data on servers in China. Chinese law lets the state require companies to cooperate with intelligence work. The order warns that use "may result in the transfer of sensitive data to the PRC".

The order also names risks that are easy to overlook. Collected data could help identify US persons or agencies. The models could contain malware or vulnerabilities.

The key word for ordinary users is "prompt". A prompt is whatever you type or paste into the chatbot. A civil servant who pastes a draft memo has handed that memo to the provider. If the provider stores it abroad, or passes it to a partner, it leaves your control.

The order describes risks. It does not claim that every DeepSeek user has suffered a leak. That distinction is fair to keep in mind.

## How China reacted

Beijing pushed back within a day. According to AP, Foreign Ministry spokesperson Mao Ning said China opposes stretching the concept of national security. She said China would firmly safeguard the legitimate rights and interests of Chinese companies.

The Ministry of Commerce went further. It expressed "strong dissatisfaction and firm opposition". It accused Washington of using "the guise of national security" to contain China. It also said the move ignored understandings reached between the two countries' leaders. Whether Beijing will retaliate in practice is not yet known.

## South Korea moved first

South Korea acted in February 2025, weeks after DeepSeek went viral.

- On February 4, the Ministry of the Interior and Safety (Haengjeong Anjeonbu) sent a caution about generative AI services to central agencies and 17 provincial governments.
- On February 5, the Ministry of Trade, Industry and Energy, the Ministry of Foreign Affairs and the Ministry of National Defense restricted DeepSeek on work computers.
- Other ministries, including the Ministry of Environment, followed. Companies such as Kakao barred staff from using it for work.
- Personal use stayed legal.

On February 15, 2025, DeepSeek suspended new app downloads in Korea. It did so after talks with the Personal Information Protection Commission (PIPC, Gaein Jeongbo Bohowiwonhoe).

On April 24, 2025, the PIPC published its findings. DeepSeek had transferred Korean users' data to companies in China and the US without consent or disclosure. One case stood out. DeepSeek sent the text of user prompts, along with device, network and app information, to Beijing Volcano Engine Technology. Volcano Engine is a cloud company owned by ByteDance, the parent of TikTok. The PIPC described it as a separate legal entity from ByteDance itself.

A common claim online is that DeepSeek is "a ByteDance company". It is not. DeepSeek is an independent firm based in Hangzhou. ByteDance appears in this story only because its subsidiary received the prompt data.

DeepSeek told the PIPC it stopped those transfers on April 10, 2025. The PIPC recommended that it destroy the prompt data already sent, publish a Korean-language privacy policy, and set a legal basis for overseas transfers.

DeepSeek returned to Korean app stores on April 28, 2025. Users can now refuse the transfer of their data to some companies in China and the US. The PIPC said DeepSeek was free to relaunch after at least partly adopting its recommendations.

The Korean case is a useful preview. Regulators did not just guess at risk. They traced where prompts went and found a third party nobody had told users about.

## What to check before you allow an AI app

You do not need a federal order to ask the right questions. Before your organisation approves any AI tool, check these points:

- Where are prompts and files stored? Ask for the country and the cloud provider.
- Which third parties receive data? Ask for the full list, not just "service providers".
- Are prompts used for training? Look for a clear opt-out, ideally off by default for business accounts.
- How long is data kept? Look for a specific retention period and a deletion process.
- Can users refuse overseas transfers? Korea forced DeepSeek to add this option. Others may not offer it.
- What model runs underneath? A product with a familiar brand may call a model you would not approve on its own.
- Who can see admin logs? You need to know which staff used the tool and for what.

Pick one AI tool your team uses today. Open its privacy policy this week and answer those seven questions. If you cannot, pause sensitive use until you can.

## Sources

- Federal Register (public inspection): https://public-inspection.federalregister.gov/2026-21447.pdf
- CyberScoop: https://cyberscoop.com/dhs-bans-deepseek-federal-agencies/
- CNBC: https://www.cnbc.com/2026/10/20/us-deepseek-federal-agency-ban.html
- The Washington Times: https://www.washingtontimes.com/news/2026/oct/20/homeland-security-bans-deepseek-federal-civilian-agency-systems/
- The Next Web: https://thenextweb.com/news/us-bars-deepseek-federal-agencies
- U.S. News & World Report (AP): https://www.usnews.com/news/business/articles/2026-10-20/china-defends-deepseek-after-us-ban-of-its-ai-from-government-systems
- NBC News: https://www.nbcnews.com/world/asia/china-defends-deepseek-us-ban-ai-government-systems-rcna604721
- ABS-CBN (AFP): https://www.abs-cbn.com/news/technology/2025/2/6/south-korea-ministries-block-deepseek-s-access-1847
- The Korea Times: https://www.koreatimes.co.kr/southkorea/law-crime/20250206/korean-govt-ministries-begin-to-block-access-to-deekseek-due-to-security-concerns
- The Korea Times: https://www.koreatimes.co.kr/amp/southkorea/globalcommunity/20250424/deepseek-transferred-korean-users-data-abroad-without-permission-govt
- South China Morning Post: https://www.scmp.com/news/asia/east-asia/article/3307788/south-korea-says-deepseek-sent-data-bytedance-owned-servers-china-without-consent
- Bitdefender: https://www.bitdefender.com/en-us/blog/hotforsecurity/deepseek-ai-returns-to-south-korea-despite-past-privacy-violations
- Ajou Business Daily (in Korean): https://www.ajunews.com/view/20250428164100969
