'use client';

import { Button } from '@/components/ui/button';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground font-sans"> {/* Ensure font-sans is applied if not inherited globally */}
      {/* Header/Navigation */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            {/* Assuming you have a Logo component or similar */}
            {/* <FoloLogo className="h-8 w-auto text-primary" /> */}
            <span className="font-bold text-xl text-primary">FoloMoney</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="/privacy-policy" className="text-sm font-medium text-primary">Privacy Policy</Link>
            <Link href="/#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="https://play.google.com/store/apps/details?id=com.folomoney.app" passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm">Download App</Button>
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-3 border-b border-border/40">
        <div className="container mx-auto px-6">
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
              <Home className="h-3 w-3 mr-1.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-1.5 text-muted-foreground/70" />
            <span className="text-foreground font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="container mx-auto px-6 py-10 md:py-16">
        <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

          <p>Folomoney is committed to the protection of personal information. We have prepared this Privacy Policy to describe the manner in which Folo and its affiliated companies (collectively, &ldquo;Folo App&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collect, use, disclose and otherwise manage your information (&ldquo;Personal Information&rdquo;) in connection with your access to and use of our Services (as defined in our Terms of Use) including through&nbsp;www.folomoney.com (the &ldquo;Website&rdquo;) and Folo&nbsp;mobile application (the &ldquo;App&rdquo;) and through other interactions with us.</p>

          <p>Folo&nbsp;may provide third party content or links to third-party web sites or applications. When you leave our Services or interact with a third-party feature, you should read the applicable third party&rsquo;s privacy policies and terms of service to make sure you understand how they might collect and share information about you. We do not share your credit reports or credit scores with third parties (except agents acting on our behalf; as further explained below) and we do not share your Personal Information with third parties for their advertising or marketing lists without your consent.</p>

          <h2>Collection and Use of Information</h2>

          <p>We collect information about you in the following manner:<br />
          Identification information like your Name, Date of birth, Address, National ID and Contact details:</p>

          <ul>
            <li>information you give us</li>
            <li>information we collect from third parties about you</li>
            <li>information we collect about you based on your use of our Services</li>
          </ul>

          <h2>Information You Give Us</h2>

          <p>This information about you may be collected you when you use our Services or by communicating with us. This includes information you provide when accessing the following Services (including these but limited to): when you create an account to get your credit score, monthly membership and report, apply for a loan, answer specific questions through various forms, provide us with feedback, participate in surveys, contests or promotions and when you contact us with a question or to report a problem.</p>

          <p>The information you give us may include your name, contact information (such as mailing address and email address), date of birth, income, information about your rent or mortgage payments, credit-related information, your financial goals, referral source and your national identification number. You are not required to provide your national identification number in order to apply for a loan or enter into a loan agreement or to sign-up for the personal finance service. However, if you choose to provide it, we use it to assist us in identifying you with CRB agencies and for internal fraud prevention purposes.</p>

          <p>If you use some of our Services (such as if you are approved for a loan), we may ask you to provide other information including proof of income (such as pay stubs or Notices of Assessment from your tax return), your bank account details (account number, transit, etc.), Mpesa account details, purpose of the loan, and information regarding your employment such as occupation, current or former employer(s). We may also collect personal and employment references with your consent. Folo does not receive your bank account login information. As part of this verification process, we may collect transaction history from your bank account and/or Mpesa account in order to verify that your income deposits match the documents you have submitted and, in certain circumstances, to assess your suitability for the loan. We also verify your identity by asking you questions from CRB or other identity verification service providers or by verifying your name, address, date of birth and mobile phone number with your mobile service provider.</p>

          <p>We may monitor and record our telephone conversations with you for training and quality assurance purposes. You will be provided with a notice at the beginning of any call that is being recorded. If you do not wish to have your call recorded, please let us know.</p>

          <h2>Information We Collect From Third Parties About You</h2>

          <p>We collect Personal Information from third parties or service providers with your consent or where otherwise permitted or required by law. This information includes the credit reports and credit scores we obtain from CRB or other credit reporting agencies, information about your credit history and other financial information which is relevant to the provision of our Services, as well as information which is gathered in order to verify your identity and prevent fraudulent or illegal activity. We also work closely with third parties (including, for example, business partners, service providers, advertising networks, analytics providers, search information providers, social media) and may receive information from them, such as whether or not you have taken out a product with them, what other products you may have used, and other such details. We might also collect information from other users like you through things like a member referral program.</p>

          <p>If you apply for a loan using our Website or App, you will be asked to provide consent to Folo obtaining a credit score and/or report from CRB. By providing such consent, you consent to Folo or its service provider, affiliates or agents obtaining and using credit and other personal information about you (including credit reports) from any credit reporting agency, and exchanging information with any of them, on an ongoing basis. You acknowledge that this consent is effective immediately upon submitting your application and is being obtained to determine your eligibility for a loan, and if approved, to open and administer your loan, review and verify your ongoing creditworthiness, and manage and assess risk. You authorize any credit reporting agency to provide this information to Folo and any of its service providers, affiliates or agents.</p>

          <p>If you register for an account in order to obtain a credit score and/or credit report, Folo will obtain your consent and collect personal information (first and last name, date of birth, mailing address and telephone number) in order to obtain and provide you with your credit score and/or credit report from CRB or another consumer reporting agency. Your credit report may include information such as the types and amounts of credit advanced to you, payment histories, negative banking items, collection actions, legal proceedings, previous bankruptcies and other information reported by your creditors. Folo also collects additional personal information from you, including your email address, financial goals, annual income range, and referral source. Folo uses your credit score, information from your credit report and other information you provide in order to better understand your financial needs and credit history, and provide you with tailored personal finance information, educational insights and recommendations which may include information on steps to improve your credit score, as well as personalized offers for Folo and third-party financial services products and services that may be of interest to you based on your credit-related and other information. Folo will obtain and provide your credit score and credit report to you at the time of account creation and on a regular basis thereafter as long as you have an active account with Folo in order to provide you with up-to-date information and offers. If you wish to withdraw your consent to the collection and use of your credit score and credit report information, you may close your account at any time by contacting <a href="mailto:care@folomoney.com" className="text-primary hover:underline">care@folomoney.com</a>.</p>

          <h2>Information We Collect About You Based On Your Use of Our Services</h2>

          <p>Each time you visit our Website or use our App we may automatically collect certain information about how you access and interact with our Services. We and third parties may use various technologies to collect, use and store this information. These may include cookies, browser web storage, web beacons and similar technologies. The information we may automatically collect includes the following: Website Information:</p>

          <p><strong>About your visit</strong> &ndash; &nbsp;including the full URL clickstream to, through and from our website (including date and time); products you viewed or searched for; page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page and any phone number used to call our customer service number</p>

          <p><strong>Technical</strong> &ndash; &nbsp;including the Internet protocol (IP) address, device information, device operations, your login information, browser type and version, time zone setting, operating system and platform</p>

          <p><strong>Location</strong> &ndash; &nbsp;including your internet protocol (IP) address or other device information or information about your visit to estimate your location (e.g., your city or province).</p>

          <h2>App Usage Information &amp; Analytics</h2>

          <p>Certain limited data is required for the App to function on your device. This data includes the type of device hardware and operating system, unique device identifier, IP address, language settings, and the date and time the App accesses our servers. We use this information to help us understand the activity on our App, to monitor and improve our App, and to tailor your in-App experience. In addition, we may use third party service providers to collect analytical information about your use of the App, such as the App features used and time spent on the App, to help us tailor your in-app experience, improve our products and the quality of our App, and to manage and analyze data in order to better understand our users.</p>

          <p>We may also request to use location-enabled services on your device (which typically provide GPS or Wi-Fi access point details) to enhance our Services. We will only use these location-enabled services on your device with your consent.</p>

          <h2>Use of Information We Collect</h2>
          <p>Some examples of how we use the information we collect:</p>

          <ul>
            <li>provide you with Services, such as our credit score and report offering or Credit Coach</li>
            <li>assess your application and eligibility for a loan and, if approved, administering your loan and collecting outstanding debts</li>
            <li>manage your account and relationship with us and to, communicate with you by telephone, mail, email, text (SMS) message or other electronic means about your account</li>
            <li>verify your identity as part of our identity authentication process and other information you have provided to us (including your bank account, employment and income)</li>
            <li>provide you with information, products and Services</li>
            <li>notify you about changes to our Services</li>
            <li>ensure that content from our Website and App is presented in the most effective manner for you and your device</li>
            <li>aggregate it on an anonymous basis with other data for data analysis and reporting purposes</li>
            <li>undertake analysis of your credit information in order to identify and inform you of credit products that we consider are likely to interest you or be suited to your credit circumstances or to enhance our Services</li>
            <li>meeting legal and regulatory requirements</li>
            <li>detecting and preventing fraud and other unauthorized or illegal activities</li>
            <li>as otherwise permitted or required by applicable law.</li>
          </ul>

          <h2>Marketing Communications</h2>
          <p>If you have provided your consent, we may provide you with information about Folo or other products and services we feel may interest you or be best for you based on information we have about you (including emails, text messages, and notifications).<br />
          You can opt-out any time by contacting us as set out under Contact Us below, or by taking the following steps:</p>
          <ul>
            <li>You can opt-out of receiving marketing emails at any time by clicking on the unsubscribe link included in our marketing email communications. Please note that you may continue to receive certain transactional or account-related emails from us.</li>
            <li>To opt-out of push notifications, you can manage your notification preferences within Your Account Settings on the App.</li>
          </ul>

          <h2>Sharing of Information We Collect</h2>

          <p>We will not disclose, trade, rent, sell or otherwise transfer your Personal Information, without your consent, except as otherwise set out herein. We use information we hold about you to provide our Services to you and improve those services, manage your account and communicate with you and to use information on an anonymous basis for research, profiling and analytical purposes.</p>

          <p><strong>Service Providers:</strong> Your Personal Information may be transferred (or otherwise made available) to our affiliates and other third parties who provide services on our behalf. Folo uses service providers (including its authorized sub-contractors) to provide services such as billing, administration, debt collection and advertising and analytics services, to verify information you have provided to us and to administer pre-authorized debit agreements. Folo may use service providers to host the Website, App, operate certain of its features, send email, SMS text messages or other communications, or manage and analyze data and our advertising effectiveness. Your Personal Information may be maintained and processed by Folo, affiliates and other third-party service providers in Kenya or other jurisdictions. In the event Personal Information is transferred to foreign jurisdiction, it will be subject to the laws of that jurisdiction and may be disclosed to or accessed by the courts, law enforcement and governmental authorities in accordance with those laws. Service providers are given the information they need to perform their designated functions, and are not authorized to use or disclose Personal Information for their own marketing or other purposes.&nbsp;</p>

          <p><strong>Investors:</strong> Loans are funded through capital provided by third-party investors. Information about current and former customers will be shared on a non-identifiable basis with current as well as potential investors. The information provided to investors includes aggregated data derived from customer credit history data and loan performance information. The information is presented in a manner that the identity of an individual would not be identifiable from the data. We share this information in order to allow current and potential investors to evaluate the performance of the loans. For example, the data may be used to determine default and delinquency rates in the loan portfolio, or to present aggregate information on creditworthiness.</p>

          <p><strong>CRB or other consumer reporting agency:</strong> If you have signed up for Folo Services, Folo will obtain your consent to provide your first and last name, date of birth, address and telephone number to CRB so that they can provide you with your credit score and/or credit report at the time of account creation and on a regular basis thereafter for the purposes set out above in this Privacy Policy.</p>

          <p><strong>Business Partners:</strong> If you use certain Services we will share certain personal information we have about you (such as your contact information) with third party business partners (for example, if you submit a mortgage questionnaire or if we pre-populate an application with your information). In these situations, we will confirm with you that we will be sending your information or we will send you to the business partner&rsquo;s site or platform for you to provide the information directly to them.</p>

          <p><strong>Legal/Compliance:</strong> Folo and its affiliates and other service providers may provide your Personal Information in response to a search warrant or other legally valid inquiry or order (which may include lawful access by other foreign governmental authorities, courts or law enforcement agencies), to other organizations in the case of investigating a breach of an agreement or contravention of law or detecting, suppressing or preventing fraud or as otherwise required or permitted by applicable other law. Your Personal Information may also be disclosed where necessary for the establishment, exercise or defence of legal claims and to investigate or prevent actual or suspect loss or harm to persons or property.</p>

          <p><strong>Sale of Business:</strong> Personal Information may be transferred as an asset in connection with a prospective or completed merger or sale (including transfers made as part of insolvency or bankruptcy proceedings) involving all or part of Folo or as part of a corporate reorganization or stock sale or other change in corporate control.</p>

          <h2>Cookies, Interest-Based Advertising, and Additional Information About Our Website</h2>

          <p><strong>Visiting our Website:</strong><br />
          In general, you can visit the Website without telling us who you are or submitting any Personal Information. However, we and/or our service providers to collect IP (Internet protocol) addresses from all visitors to the Website and other related information such as page requests, browser type, operating system and average time spent on our Website. This information is used to help us understand our Website activity, and to monitor and improve the Website.</p>

          <p><strong>Cookies, Tracer Tags &amp; Web Beacons:</strong><br />
          Our Website or App uses a technology called &ldquo;cookies&rdquo;. A cookie is a tiny element of data that our Website sends to a user&rsquo;s browser, which may then be stored on the user&rsquo;s hard drive so that we can recognize the user&rsquo;s computer or device when they return. Cookies may provide us and our service providers with information that we will use to personalize our Website&nbsp;and App&nbsp;in accordance with a user&rsquo;s preferences. You may set your Web browser to notify you when you receive a cookie or to not accept certain cookies. However, if you decide not to accept cookies from our Website or App, you may not be able to take advantage of all of the features of our Website or App.<br />
          We may use a third party such as Google Analytics to help us gather and analyze information about the areas visited on the Website (such as the pages most read, time spent, search terms and other engagement data) in order to evaluate and improve the user experience and the Website. For more information or to opt-out using the Google Analytics opt-out browser add-on, see &ldquo;How Google uses data when you use our partners&rsquo; sites or apps&rdquo; and &ldquo;Google Analytics and Privacy&rdquo;.<br />
          Our Website may also use a technology called &ldquo;tracer tags&rdquo; or &ldquo;Web Beacons&rdquo;. This technology allows us to understand which pages you visit on our Website. These tracer tags are used to help us optimize and tailor our Website for you and other future visitors to our Website.</p>

          <p><strong>Interest-Based Advertising:</strong><br />
          We work with third-parties such as ad networks and other advertising companies that use their own tracking technologies (including cookies and pixel tags) on our Website and App in order to provide you with tailored advertisements across the Internet. These companies may collect information about your activity on our Website and App and third-party websites and Apps (such as web pages you visit and your interaction with our advertising and other communications) and use this information to make predictions about your preferences, develop personalized content and deliver ads that are more relevant to you on third party websites. This information may also be used to evaluate our online advertising campaigns. Opting-out of Interest-Based Advertising: For more information about interest-based advertising and to understand your options, including how you can opt-out of receiving behavioural ads from third-party advertising companies participating in the Digital Advertising. Please note that even if you opt-out of interest-based advertising by a third party, these tracking technologies may still collect data for other purposes including analytics and you will still see ads from us, but the ads will not be targeted based on behavioural information about you and may, therefore, be less relevant to you and your interests. To successfully opt out, you must have cookies enabled in your web browser (see your browser&rsquo;s instructions for information on cookies and how to enable them). Your opt-out only applies to the web browser you use so you must opt-out of each web browser on each computer you use. Once you opt out, if you delete your browser&rsquo;s saved cookies, you will need to opt-out again.</p>

          <p><strong>Third Party Links:</strong><br />
          Our Website may contain links to other sites that we do not own or operate, including social media websites. Also, links to our Website may be featured on third party websites on which we advertise. Except as provided herein, we will not provide any of your Personal Information to these third parties without your consent. We provide links to third party websites as a convenience to the user. These links are not intended as an endorsement of or referral to the linked websites. The linked websites have separate and independent privacy statements, notices and terms of use, which we recommend you read carefully. We do not have any control over such websites, and therefore we have no responsibility or liability for the manner in which the organizations that operate such linked websites may collect, use or disclose, secure and otherwise treat your Personal Information.</p>

          <h2>Retention and Deletion Policy</h2>

          <p>Our approach to retaining personal data is guided by the principle of keeping data only for as long as necessary to fulfill the purposes for which it was collected, including for the requirements of conducting business, providing our services, and complying with our legal obligations.</p>

          <ul>
            <li>Retention Periods for Account Information, we retain your account information for as long as your account is active plus a period of time afterwards to deal with account-related issues.</li>
            <li>Transaction data is kept for a period necessary to complete the transactions and to comply with legal financial reporting requirements.</li>
            <li>Contact information is retained for the duration of our relationship with you and for a period afterwards.</li>
            <li>We retain usage data for a period that is necessary for us to conduct analyses and improve our services.</li>
            <li>Deletion of data,&nbsp;upon expiration of the retention periods, or if you request the deletion of your personal data, we&nbsp;delete or anonymize your personal data. Deletion Link&nbsp;<a href="https://www.folomoney.com/deleteaccount.html" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.folomoney.com/deleteaccount.html</a></li>
          </ul>

          <p>We regularly review our data retention policies to ensure they comply with applicable laws and regulations. We maintain your Personal Information on a confidential basis on servers. We have implemented reasonable administrative, technical and physical measures in an effort to safeguard the Personal Information in our custody and control against theft, loss and unauthorized access, use, modification and disclosure. We restrict access to your Personal Information on a need-to-know basis to employees and authorized service providers who require access to fulfil their job requirements. We have Personal Information retention processes designed to retain Personal Information of our customers for no longer than necessary for the purposes stated above or to otherwise meet legal requirements (which may extend beyond the end of your relationship with us).</p>

          <h2>Access to Your Personal Information</h2>
          <p>You have the right to access, update, and correct inaccuracies in your Personal Information in our custody and control, subject to certain exceptions prescribed by law. You may request access, updating and corrections of inaccuracies in Personal Information we have in our custody or control by emailing or writing to us at the contact information set out below. You may also update certain contact information through our online portal. We may request certain Personal Information for the purposes of verifying the identity of the individual seeking access to their Personal Information records.</p>

          <h2>Securing Your Personal Information</h2>
          <p>&zwj;Securing your personal information is important to us. We will take steps reasonably available to us to protect your personal information from misuse, interference or loss; and unauthorised access, modification or disclosure. We ensure that access to your personal information is OTP, authentication or password protected and available only to those of our employees or teams that need to use, disclose or manage it under this policy. When there is a data breach happens we&nbsp;will take immediate steps to determine the breach, its cause and how to fix it as stipulated in our business continuity process. We will communicate with you of the extent of the data breach and means of regaining control of that information. We will also notify the Office of the Data Protection Commissioner or any other regulator, if appropriate and comply with all other relevant legal requirements.</p>

          <h2>Changes to the Privacy Policy</h2>
          <p>This Privacy Policy may be updated periodically to reflect changes to our Personal Information practices. We will post the updated Privacy Policy on our website. Your Personal Information will be treated in accordance with the Privacy Policy in place at the time your Personal Information was collected unless you otherwise consent.</p>

          <h2>Contact Us</h2>
          <p>Please contact our Privacy Officer if:</p>

          <ul>
            <li>you have any questions or comments about this Privacy Policy,</li>
            <li>you wish to access, update, and/or correct inaccuracies in your Personal Information, or</li>
            <li>you otherwise have a question or complaint about the manner in which we or our service providers treat your Personal Information.</li>
          </ul>

          <p>You may contact our Privacy Officer by email:&nbsp;<a href="mailto:care@folomoney.com" className="text-primary hover:underline">care@folomoney.com</a> or by phone/WhatsApp at <a href="tel:+254725763465" className="text-primary hover:underline">+254725763465</a>.</p>

        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">FoloMoney</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reimagining financial services for Kenya and beyond. Zero transfer fees, smart savings, and global reach.
              </p>
              {/* Add social media icons here if you have them as components */}
            </div>
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                {/* <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li> */}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li> {/* Added placeholder */}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Download App</h3>
              <p className="text-sm text-muted-foreground mb-3">Get the FoloMoney app today!</p>
              <Link href="https://play.google.com/store/apps/details?id=com.folomoney.app" passHref legacyBehavior>
                 <a target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="w-full sm:w-auto">Download Now</Button>
                 </a>
              </Link>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/40">
            &copy; {new Date().getFullYear()} FoloMoney Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 