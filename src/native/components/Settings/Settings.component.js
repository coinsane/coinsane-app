import React, { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text, Label } from 'native-base';
import ActivityView from 'react-native-activity-view';
import * as StoreReview from 'react-native-store-review';
import VersionNumber from 'react-native-version-number';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer/Spacer.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import styles from './Settings.styles';
import { colors } from '../../styles';

class Profile extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({}).isRequired,
    getSettings: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSettings();
  }

  render() {
    const {
      drawer, settings,
    } = this.props;

    const items = [
      {
        label: 'Currency',
        name: settings.currencies.map(({ market, currency }) => (market ? market.symbol : currency.code)).join(','),
        onPress: () => {},
      },
      {
        name: 'Sharing',
        onPress: () => {
          ActivityView.show({
            text: 'Coinsane is awesome!',
            url: 'https://coinsane.org',
          });
        },
      },
      {
        name: 'Terms and Conditions',
        onPress: () => Actions.page({
          title: 'Terms and Conditions',
          content: 'These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with Coinsane mobile application (the "Service") operated by Opus Labs CVBA ("us", "we", or "our").\n\nPlease read these Terms and Conditions carefully before using our Coinsane mobile application (the "Service").\n\nYour access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.\n\nBy accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.\n\n#Subscriptions\n\nSome parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.\n\nAt the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Opus Labs CVBA cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting Opus Labs CVBA customer support team.\n\nA valid payment method, including credit card or PayPal, is required to process the payment for your Subscription. You shall provide Opus Labs CVBA with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize Opus Labs CVBA to charge all Subscription fees incurred through your account to any such payment instruments.\n\nShould automatic billing fail to occur for any reason, Opus Labs CVBA will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.\n\n#Fee Changes\n\nOpus Labs CVBA, in its sole discretion and at any time, may modify the Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.\n\nOpus Labs CVBA will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.\n\nYour continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.\n\n#Refunds\n\nCertain refund requests for Subscriptions may be considered by Opus Labs CVBA on a case-by-case basis and granted in sole discretion of Opus Labs CVBA.\n\n#Accounts\n\nWhen you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.\n\nYou are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.\n\nYou agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.\n\n#Intellectual Property\n\nThe Service and its original content, features and functionality are and will remain the exclusive property of Opus Labs CVBA and its licensors. The Service is protected by copyright, trademark, and other laws of both the Belgium and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Opus Labs CVBA.\n\n#Links To Other Web Sites\n\nOur Service may contain links to third-party web sites or services that are not owned or controlled by Opus Labs CVBA.\n\nOpus Labs CVBA has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Opus Labs CVBA shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.\n\nWe strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.\n\n#Termination\n\nWe may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.\n\nUpon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.\n\nLimitation Of Liability\n\nIn no event shall Opus Labs CVBA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.\n\n#Disclaimer\n\nYour use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.\n\nOpus Labs CVBA its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.\n\n#Governing Law\n\nThese Terms shall be governed and construed in accordance with the laws of Belgium, without regard to its conflict of law provisions. Disputes are under the exclusive jurisdiction of the Courts of Ghent.\n\nOur failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.\n\n#Changes\n\nWe reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.\n\nBy continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.\n\n\n*Latest update: September 22, 2017*',
        }),
      },
      // {
      //   name: 'FAQ',
      //   onPress: () => Actions.page({
      //     title: 'FAQ',
      //     content: 'FAQ',
      //   }),
      // },
      {
        name: 'Rate the app',
        onPress: () => {
          if (StoreReview.isAvailable) {
            StoreReview.requestReview();
          }
        },
      },
      {
        name: 'Privacy policy',
        onPress: () => Actions.page({
          title: 'Privacy policy',
          content: 'Coinsane\n\nKrasnodar, Russia\n\nOwner contact email: [tema@coinsane.org](mailto:tema@coinsane.org)\n\n# Our engagement\n\n- We will **NEVER** sell your data\n- We will **ALWAYS** offer data portability (at the very least via CSV export)\n- We will remove **ALL** your data as instantly and as permanently as possible after your first request\n- We will do our best effort to enhance your control and your ownership of your data\n- We will comply with Belgian and EU current and future privacy and data protection regulations\n\n# Types of Data collected\n\nAmong the types of Personal Data that this Application collects, by itself or through third parties, there are: Cookies and Usage Data. Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.\n\nThe Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using this Application. All Data requested by this Application is mandatory and failure to provide this Data may make it impossible for this Application to provide its services. In cases where this Application specifically states that some Data is not mandatory, Users are free not to communicate this Data without any consequences on the availability or the functioning of the service.\n\nUsers who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.\n\nAny use of Cookies – or of other tracking tools – by this Application or by the owners of third party services used by this Application serves the purpose of providing the service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy, if available. Users are responsible for any third party Personal Data obtained, published or shared through this Application and confirm that they have the third party\'s consent to provide the Data to the Owner.\n\n# Mode and place of processing the Data\n\n## Methods of processing\n\nThe Data Controller processes the Data of Users in a proper manner and shall take appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.\n\nThe Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Data Controller, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of the site (administration, sales, marketing, legal, system administration) or external parties (such as third party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Data Controller at any time.\n\n## Place\n\nThe Data is processed at the Data Controller\'s operating offices and in any other places where the parties involved with the processing are located. For further information, please contact the Data Controller.\n\n## Retention time\n\nThe Data is kept for the time necessary to provide the service requested by the User, or stated by the purposes outlined in this document, and the User can always request that the Data Controller suspend or remove the data.\n\n# The use of the collected Data\n\nThe Data concerning the User is collected to allow the Owner to provide its services, as well as for the following purposes: Analytics. The Personal Data used for each purpose is outlined in the specific sections of this document.\n\n# Detailed information on the processing of Personal Data\n\nPersonal Data is collected for the following purposes and using the following services:\n\n## Analytics\n\nThe services contained in this section enable the Owner to monitor and analyze web traffic and can be used to keep track of User behavior.\n\n## Google Analytics (Google Inc.)\n\nGoogle Analytics is a web analysis service provided by Google Inc. (“Google”). Google utilizes the Data collected to track and examine the use of this Application, to prepare reports on its activities and share them with other Google services.\n\nGoogle may use the Data collected to contextualize and personalize the ads of its own advertising network.\n\nPersonal Data collected: Cookies and Usage Data.\n\nPlace of processing: US – Privacy Policy – Opt Out\n\n# Additional information about Data collection and processing\n\n## Legal action\n\nThe User\'s Personal Data may be used for legal purposes by the Data Controller, in Court or in the stages leading to possible legal action arising from improper use of this Application or the related services.\n\nThe User declares to be aware that the Data Controller may be required to reveal personal data upon request of public authorities.\n\n## Additional information about User\'s Personal Data\n\nIn addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual information concerning particular services or the collection and processing of Personal Data upon request.\n\n## System logs and maintenance\n\nFor operation and maintenance purposes, this Application and any third party services may collect files that record interaction with this Application (System logs) or use for this purpose other Personal Data (such as IP Address).\n\n## Information not contained in this policy\n\nMore details concerning the collection or processing of Personal Data may be requested from the Data Controller at any time. Please see the contact information at the beginning of this document.\n\n## The rights of Users\n\nUsers have the right, at any time, to know whether their Personal Data has been stored and can consult the Data Controller to learn about their contents and origin, to verify their accuracy or to ask for them to be supplemented, cancelled, updated or corrected, or for their transformation into anonymous format or to block any data held in violation of the law, as well as to oppose their treatment for any and all legitimate reasons. Requests should be sent to the Data Controller at the contact information set out above.\n\n## This Application does not support “Do Not Track” requests.\n\nTo determine whether any of the third party services it uses honor the “Do Not Track” requests, please read their privacy policies.\n\n## Changes to this privacy policy\n\nThe Data Controller reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom. If a User objects to any of the changes to the Policy, the User must cease using this Application and can request that the Data Controller remove the Personal Data. Unless stated otherwise, the then-current privacy policy applies to all Personal Data the Data Controller has about Users.\n\n## Information about this privacy policy\n\nThe Data Controller is responsible for this privacy policy, prepared starting from the modules provided by Iubenda and hosted on Iubenda\'s servers.\n\n# Definitions and legal references\n\n## Personal Data (or Data)\n\nAny information regarding a natural person, a legal person, an institution or an association, which is, or can be, identified, even indirectly, by reference to any other information, including a personal identification number.\n\n## Usage Data\n\nInformation collected automatically from this Application (or third party services employed in this Application), which can include: the IP addresses or domain names of the computers utilized by the Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server\'s answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User\'s IT environment.\n\n## User\n\nThe individual using this Application, which must coincide with or be authorized by the Data Subject, to whom the Personal Data refers.\n\n## Data Subject\n\nThe legal or natural person to whom the Personal Data refers.\n\n## Data Processor (or Data Supervisor)\n\nThe natural person, legal person, public administration or any other body, association or organization authorized by the Data Controller to process the Personal Data in compliance with this privacy policy.\n\n## Data Controller (or Owner)\n\nThe natural person, legal person, public administration or any other body, association or organization with the right, also jointly with another Data Controller, to make decisions regarding the purposes, and the methods of processing of Personal Data and the means used, including the security measures concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this Application.\n\n## This Application\n\nThe hardware or software tool by which the Personal Data of the User is collected.\n\n## Cookies\n\nSmall piece of data stored in the User\'s device.\n\n## Legal information\n\nNotice to European Users: this privacy statement has been prepared in fulfillment of the obligations under Art. 10 of EC Directive n. 95/46/EC, and under the provisions of Directive 2002/58/EC, as revised by Directive 2009/136/EC, on the subject of Cookies.\n\nThis privacy policy relates solely to this Application.\n\n*Latest update: August 30, 2017*',
        }),
      },
    ];

    const channels = [
      // {
      //   name: 'Slack',
      //   icon: 'Slack',
      //   onPress: () => Linking.openURL('https://t.me/coinsane'),
      // },
      {
        name: 'Telegram',
        icon: 'Telegram',
        onPress: () => Linking.openURL('https://t.me/coinsane'),
      },
      {
        name: 'Twitter',
        icon: 'Twitter',
        onPress: () => Linking.openURL('https://twitter.com/coinsane_org'),
      },
    ];
    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Text>Settings</Text>}
        />
        <Content style={styles.settings__container}>
          <List style={styles.settings_list}>
            {items.map(({ name, label, onPress }) => (
              <ListItem
                key={name}
                button
                style={[styles.settings_listItem, label && styles.settings_listItem__withLabel]}
                onPress={onPress}
              >
                {label && <Label style={styles.settings_listItem__label}>Currency</Label>}
                <Text
                  style={[styles.settings_listItem__text, styles.settings_listItem__textWithLabel]}
                >
                  {name}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text style={styles.container__text}>{'Channels'.toUpperCase()}</Text>
          <List style={styles.settings_list}>
            {channels.map(({ name, icon, onPress }) => (
              <ListItem
                key={name}
                button
                style={[styles.settings_listItem, styles.settings_listItem__withIcon]}
                onPress={onPress}
              >
                <CoinsaneIcon name={icon} width={28} fill={colors.iconDark} />
                <Text
                  style={[styles.settings_listItem__text, styles.settings_listItem__text_withIcon]}
                >
                  {name}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text style={styles.container__text}>App version {VersionNumber.appVersion}</Text>
          <Spacer size={30} />
        </Content>
      </Container>
    );
  }
}

export default Profile;
