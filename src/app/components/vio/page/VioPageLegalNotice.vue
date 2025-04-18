<template>
  <VioLayoutProse class="m-auto">
    <h1>{{ title }}</h1>
    <h2>{{ t('tmg') }}</h2>
    <address>
      <slot v-if="$slots.tmgAddress" name="tmgAddress" />
      <i18n-t v-else keypath="tmgAddress">
        <template #br>
          <br />
        </template>
        <template #city>
          {{ appConfig.vio.pages.legalNotice.tmg.address.city }}
        </template>
        <template #name>
          {{ appConfig.vio.pages.legalNotice.tmg.address.name }}
        </template>
        <template #street>
          {{ appConfig.vio.pages.legalNotice.tmg.address.street }}
        </template>
      </i18n-t>
    </address>

    <h2>{{ t('contact') }}</h2>
    <p>
      <slot v-if="$slots.contactEmail" name="contactEmail" />
      <span v-else>
        {{
          t('email', { email: appConfig.vio.pages.legalNotice.contact.email })
        }}
      </span>
    </p>

    <h2>{{ t('responsibility') }}</h2>
    <address>
      <slot v-if="$slots.responsibilityAddress" name="responsibilityAddress" />
      <i18n-t v-else keypath="responsibilityAddress">
        <template #br>
          <br />
        </template>
        <template #city>
          {{ appConfig.vio.pages.legalNotice.responsibility.address.city }}
        </template>
        <template #name>
          {{ appConfig.vio.pages.legalNotice.responsibility.address.name }}
        </template>
        <template #street>
          {{ appConfig.vio.pages.legalNotice.responsibility.address.street }}
        </template>
      </i18n-t>
    </address>

    <h3>{{ t('liabilityContentTitle') }}</h3>
    <p>{{ t('liabilityContentDescription1') }}</p>
    <p>{{ t('liabilityContentDescription2') }}</p>

    <h3>{{ t('liabilityLinksTitle') }}</h3>
    <p>{{ t('liabilityLinksDescription1') }}</p>
    <p>{{ t('liabilityLinksDescription2') }}</p>

    <h3>{{ t('copyrightTitle') }}</h3>
    <p>{{ t('copyrightDescription1') }}</p>
    <p>{{ t('copyrightDescription2') }}</p>

    <p>
      <VioLink to="https://www.e-recht24.de">{{ t('source') }}</VioLink>
    </p>
  </VioLayoutProse>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()

// data
const title = t('title')
</script>

<i18n lang="yaml">
de:
  contact: Kontakt
  copyrightDescription1: Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
  copyrightDescription2: Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
  copyrightTitle: Urheberrecht
  email: 'E-Mail: {email}'
  liabilityContentDescription1: Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
  liabilityContentDescription2: Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
  liabilityContentTitle: Haftung für Inhalte
  liabilityLinksDescription1: Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
  liabilityLinksDescription2: Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
  liabilityLinksTitle: Haftung für Links
  responsibility: Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
  responsibilityAddress: '{name}{br}{street}{br}{city}'
  source: Quelle
  title: Impressum
  tmg: Angaben gemäß § 5 TMG
  tmgAddress: '{name}{br}{street}{br}{city}'
en:
  contact: Contact
  copyrightDescription1: The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
  copyrightDescription2: Insofar as the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, we request that you notify us accordingly. If we become aware of any infringements, we will remove such content immediately.
  copyrightTitle: Copyright
  email: 'Email: {email}'
  liabilityContentDescription1: As a service provider, we are responsible for our own content on these pages in accordance with general legislation pursuant to Section 7 (1) of the German Telemedia Act (TMG). According to §§ 8 to 10 TMG, however, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
  liabilityContentDescription2: Obligations to remove or block the use of information according to general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a concrete infringement. If we become aware of such infringements, we will remove this content immediately.
  liabilityContentTitle: Liability for content
  liabilityLinksDescription1: Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking.
  liabilityLinksDescription2: However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. If we become aware of any infringements, we will remove such links immediately.
  liabilityLinksTitle: Liability for links
  responsibility: Responsible for the content according to § 55 para. 2 RStV
  responsibilityAddress: '{name}{br}{street}{br}{city}'
  source: Source
  title: Legal notice
  tmg: Information according to § 5 TMG
  tmgAddress: '{name}{br}{street}{br}{city}'
</i18n>
