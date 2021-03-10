import { BapiProduct } from '@aboutyou/backbone';
import { Variant } from '@aboutyou/backbone/types/BapiProduct';

export const SAMPLE_PRODUCT: BapiProduct = {
  id: 3093,
  isActive: true,
  isSoldOut: false,
  isNew: false,
  createdAt: '2019-08-28T08:28:03+00:00',
  updatedAt: '2019-12-20T17:45:01+00:00',
  masterKey: 'TPX0025_M',
  attributes: {
    stoerer: {
      id: 571,
      key: 'stoerer',
      label: 'Störer',
      type: '',
      multiSelect: true,
      values: [
        {
          id: 1237,
          label: 'SALE',
          value: 'sale',
        },
      ],
    },
    materialart: {
      id: 24,
      key: 'materialart',
      label: 'Materialart',
      type: '',
      multiSelect: false,
      values: {
        id: 349,
        label: 'Handelsware',
        value: 'handelsware',
      },
    },
    volumenUnit: {
      id: 26,
      key: 'volumenUnit',
      label: 'Volumen_Unit',
      type: '',
      multiSelect: false,
      values: {
        id: 362,
        label: 'm³',
        value: 'm3',
      },
    },
    materialklasse: {
      id: 27,
      key: 'materialklasse',
      label: 'Materialklasse',
      type: '',
      multiSelect: false,
      values: {
        id: 366,
        label: 'Möbel Indoor',
        value: 'moebel_indoor',
      },
    },
    herstellungsland: {
      id: 31,
      key: 'herstellungsland',
      label: 'Herstellungsland',
      type: '',
      multiSelect: false,
      values: {
        id: 441,
        label: 'China',
        value: 'china',
      },
    },
    konfigurierbarkeit: {
      id: 32,
      key: 'konfigurierbarkeit',
      label: 'Konfigurierbarkeit',
      type: '',
      multiSelect: false,
      values: {
        id: 474,
        label: 'X',
        value: 'x',
      },
    },
    masseinheitAbmessungen: {
      id: 33,
      key: 'masseinheitAbmessungen',
      label: 'Maßeinheit Abmessungen',
      type: '',
      multiSelect: false,
      values: {
        id: 475,
        label: 'CM',
        value: 'cm',
      },
    },
    faser01: {
      id: 20,
      key: 'faser01',
      label: 'Faser_01',
      type: '',
      multiSelect: false,
      values: {
        id: 152,
        label: 'Stahl',
        value: 'stahl',
      },
    },
    faser02: {
      id: 21,
      key: 'faser02',
      label: 'Faser_02',
      type: '',
      multiSelect: false,
      values: {
        id: 243,
        label: 'Polyester',
        value: 'polyester',
      },
    },
    anlieferart: {
      id: 23,
      key: 'anlieferart',
      label: 'Anlieferart',
      type: '',
      multiSelect: false,
      values: {
        id: 345,
        label: 'Standardabwicklung (Dekoartikel)',
        value: 'standardabwicklung_dekoartikel',
      },
    },
    einkufergruppe: {
      id: 29,
      key: 'einkufergruppe',
      label: 'Einkäufergruppe',
      type: '',
      multiSelect: false,
      values: {
        id: 414,
        label: 'Denis Dubinizki',
        value: 'denis_dubinizki',
      },
    },
    gewichtsEinheit: {
      id: 30,
      key: 'gewichtsEinheit',
      label: 'Gewichts_Einheit',
      type: '',
      multiSelect: false,
      values: {
        id: 439,
        label: 'KG',
        value: 'kg',
      },
    },
    produktBreite: {
      id: 553,
      key: 'produktBreite',
      label: 'ProduktBreite',
      type: '',
      multiSelect: false,
      values: {
        id: 1675,
        label: '47',
        value: '47_cm',
      },
    },
    produktHoehe: {
      id: 554,
      key: 'produktHoehe',
      label: 'ProduktHöhe',
      type: '',
      multiSelect: false,
      values: {
        id: 1450,
        label: '84',
        value: '84_cm',
      },
    },
    produktTiefe: {
      id: 590,
      key: 'produktTiefe',
      label: 'ProduktTiefe',
      type: '',
      multiSelect: false,
      values: {
        id: 2761,
        label: '41',
        value: '41_cm',
      },
    },
    lieferantenKuerzel: {
      id: 620,
      key: 'lieferantenKuerzel',
      label: 'Lieferanten Kürzel',
      type: '',
      multiSelect: false,
      values: {
        id: 6529,
        label: 'TPX',
        value: 'tpx',
      },
    },
    artikelTyp: {
      id: 630,
      key: 'artikelTyp',
      label: 'Artikel Typ',
      type: '',
      multiSelect: false,
      values: {
        id: 3925,
        label: 'Sammelartikel',
        value: 'sammelartikel',
      },
    },
    produktMasseinheiten: {
      id: 679,
      key: 'produktMasseinheiten',
      label: 'Haupt-Maßeinheit',
      type: '',
      multiSelect: false,
      values: {
        id: 9044,
        label: 'cm',
        value: 'cm',
      },
    },
    fEMissionAttribute: {
      id: 681,
      key: 'fEMissionAttribute',
      label: 'TEST: Mission for FE',
      type: '',
      multiSelect: false,
      values: {
        id: 9052,
        label: 'True',
        value: 'true',
      },
    },
    adjustForDev: {
      id: 683,
      key: 'adjustForDev',
      label: 'adjustForDev',
      type: '',
      multiSelect: false,
      values: {
        id: 9053,
        label: 'True',
        value: 'true',
      },
    },
    farbe: {
      id: 2,
      key: 'farbe',
      label: 'Farbe',
      type: '',
      multiSelect: false,
      values: {
        id: 4,
        label: 'schwarz',
        value: 'schwarz',
      },
    },
    onlineShopStatusAT: {
      id: 4,
      key: 'onlineShopStatusAT',
      label: 'Online-Shop_Status_AT',
      type: '',
      multiSelect: false,
      values: {
        id: 85,
        label: 'aktiver Artikel',
        value: 'aktiver_artikel',
      },
    },
    onlineShopStatusCH: {
      id: 5,
      key: 'onlineShopStatusCH',
      label: 'Online-Shop_Status_CH',
      type: '',
      multiSelect: false,
      values: {
        id: 97,
        label: 'aktiver Artikel',
        value: 'aktiver_artikel',
      },
    },
    onlineShopStatusDE: {
      id: 6,
      key: 'onlineShopStatusDE',
      label: 'Online-Shop_Status_DE',
      type: '',
      multiSelect: false,
      values: {
        id: 110,
        label: 'aktiver Artikel',
        value: 'aktiver_artikel',
      },
    },
    quantityProductLosgroesse: {
      id: 7,
      key: 'quantityProductLosgroesse',
      label: 'Quantity-Product Losgröße',
      type: '',
      multiSelect: false,
      values: {
        id: 123,
        label: '2',
        value: '2',
      },
    },
    mengeneinheitQuantityProducts: {
      id: 8,
      key: 'mengeneinheitQuantityProducts',
      label: 'Mengeneinheit_Quantity_Products',
      type: '',
      multiSelect: false,
      values: {
        id: 564,
        label: 'IC',
        value: 'ic',
      },
    },
    saison: {
      id: 19,
      key: 'saison',
      label: 'Saison_Kennzeichen',
      type: '',
      multiSelect: false,
      values: {
        id: 131,
        label: 'Ganzjahresartikel',
        value: 'ganzjahresartikel',
      },
    },
    saisonJahr: {
      id: 25,
      key: 'saisonJahr',
      label: 'Saison_Jahr',
      type: '',
      multiSelect: false,
      values: {
        id: 350,
        label: '2018',
        value: '2018',
      },
    },
    einzelhandelhinweis: {
      id: 710,
      key: 'einzelhandelhinweis',
      label: 'Einzelhandel-Hinweis',
      type: '',
      multiSelect: true,
      values: [
        {
          id: 9306,
          label: 'DE',
          value: 'de',
        },
        {
          id: 9304,
          label: 'CH',
          value: 'ch',
        },
        {
          id: 9305,
          label: 'AT',
          value: 'at',
        },
      ],
    },
    fSCFreigabe: {
      id: 717,
      key: 'fSCFreigabe',
      label: 'FSC Freigabe',
      type: '',
      multiSelect: false,
      values: {
        id: 9348,
        label: 'Nicht benötigt',
        value: 'nicht_benoetigt',
      },
    },
    isFurniture: {
      id: 60,
      key: 'isFurniture',
      label: 'IsFurniture',
      type: '',
      multiSelect: false,
      values: {
        id: 566,
        label: 'False',
        value: 'false',
      },
    },
    saleInShopDE: {
      id: 86,
      key: 'saleInShopDE',
      label: 'SaleInShop_DE',
      type: '',
      multiSelect: false,
      values: {
        id: 671,
        label: 'Sale',
        value: 'sale',
      },
    },
    saleInShopAT: {
      id: 87,
      key: 'saleInShopAT',
      label: 'SaleInShop_AT',
      type: '',
      multiSelect: false,
      values: {
        id: 674,
        label: 'Sale',
        value: 'sale',
      },
    },
    saleInShopCH: {
      id: 88,
      key: 'saleInShopCH',
      label: 'SaleInShop_CH',
      type: '',
      multiSelect: false,
      values: {
        id: 677,
        label: 'Sale',
        value: 'sale',
      },
    },
    hauptmaterial: {
      id: 585,
      key: 'hauptmaterial',
      label: 'Material',
      type: '',
      multiSelect: false,
      values: {
        id: 1268,
        label: 'Metall',
        value: 'metall',
      },
    },
    vasenGroesse: {
      id: 617,
      key: 'vasenGroesse',
      label: 'Vasen Größe',
      type: '',
      multiSelect: false,
      values: {
        id: 3370,
        label: 'groß',
        value: 'gross',
      },
    },
    setgroesse: {
      id: 675,
      key: 'setgroesse',
      label: 'Setgröße',
      type: '',
      multiSelect: false,
      values: {
        id: 8237,
        label: '2-6 teilig',
        value: '26_teilig',
      },
    },
    bestellhinweise: {
      id: 677,
      key: 'bestellhinweise',
      label: 'Bestellhinweise',
      type: '',
      multiSelect: false,
      values: {
        id: 9032,
        label:
          'Sie können diesen Artikel online nur in 2er Schritten bestellen. In den Filialen auch einzeln zu erwerben.',
        value:
          'sie_koennen_diesen_artikel_online_nur_in_2er_schritten_bestellen_in_den_filialen_auch_einzeln_zu_erwerben',
      },
    },
    suchfarbe: {
      id: 704,
      key: 'suchfarbe',
      label: 'Farbe',
      type: '',
      multiSelect: false,
      values: {
        id: 9173,
        label: 'Schwarz',
        value: 'schwarz',
      },
    },
    einzelhandelhinweisAT: {
      id: 711,
      key: 'einzelhandelhinweisAT',
      label: 'Einzelhandel-Hinweis_AT',
      type: '',
      multiSelect: false,
      values: {
        id: 9307,
        label: 'In den Filialen auch einzeln zu erwerben.',
        value: 'in_den_filialen_auch_einzeln_zu_erwerben',
      },
    },
    einzelhandelHinweisCH: {
      id: 712,
      key: 'einzelhandelHinweisCH',
      label: 'Einzelhandel-Hinweis_CH',
      type: '',
      multiSelect: false,
      values: {
        id: 9308,
        label: 'In den Filialen auch einzeln zu erwerben.',
        value: 'in_den_filialen_auch_einzeln_zu_erwerben',
      },
    },
    einzelhandelHinweisDE: {
      id: 713,
      key: 'einzelhandelHinweisDE',
      label: 'Einzelhandel-Hinweis_DE',
      type: '',
      multiSelect: false,
      values: {
        id: 9309,
        label: 'In den Filialen auch einzeln zu erwerben.',
        value: 'in_den_filialen_auch_einzeln_zu_erwerben',
      },
    },
    setInhalt: {
      id: 723,
      key: 'setInhalt',
      label: 'Set Inhalt',
      type: '',
      multiSelect: false,
      values: {
        id: 9455,
        label: '2-teilig',
        value: '2teilig_1',
      },
    },
    wasserdicht: {
      id: 573,
      key: 'wasserdicht',
      label: 'wasserdicht',
      type: '',
      multiSelect: false,
      values: {
        id: 1242,
        label: 'nein',
        value: 'nein',
      },
    },
    frostsicher: {
      id: 572,
      key: 'frostsicher',
      label: 'frostsicher',
      type: '',
      multiSelect: false,
      values: {
        id: 1240,
        label: 'nein',
        value: 'nein',
      },
    },
    plusproduktOverwrite: {
      id: 653,
      key: 'plusproduktOverwrite',
      label: 'Plusprodukt aktivieren',
      type: '',
      multiSelect: false,
      values: {
        id: 7337,
        label: 'Default = SAP',
        value: 'default_sap',
      },
    },
    nOSALEDED: {
      id: 47,
      key: 'nOSALEDED',
      label: 'NO_SALE_DE_D',
      type: '',
      multiSelect: false,
      values: {
        id: 7338,
        label: 'Sell',
        value: 'sell',
      },
    },
    styleGroup: {
      id: 0,
      key: 'styleGroup',
      label: 'Style group',
      type: '',
      multiSelect: false,
      values: {
        label: '',
        value: '',
      },
    },
    name: {
      id: null,
      key: 'name',
      label: 'Name',
      type: null,
      multiSelect: false,
      values: {
        label: 'Stuhl ca. B47xT41xH84cm, schwarz',
      },
    },
    description: {
      id: null,
      key: 'description',
      label: 'Description',
      type: null,
      multiSelect: false,
      values: {
        label: '',
      },
    },
  },
  advancedAttributes: {
    bestelltextDE: {
      id: 38,
      key: 'bestelltextDE',
      label: 'Bestelltext_DE',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value:
                  // tslint:disable-next-line: max-line-length
                  '##Möbel Indoor HOMEOFF##24237 Chair + Cushion####Packing details: 2 Chairs per carton KD, stick OC Marks##Price Label: hangtag with LOT. NO.= Order no. required##Position: on the backrest##Warning: max. load 110KG + not stand + not wobble##Positon: next to price hangtag##SVHC-REACH LoG required before Mass Production!##Assembly instruction is required in DEPOT LAYOUT##AZO Test required for the Cushion before Mass production##--------------------------------------------------------##Material: 90% Steel, 10% Polyester##handmade, handpainted',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    grundlagenTextDE: {
      id: 39,
      key: 'grundlagenTextDE',
      label: 'Grundlagen_Text_DE',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: '##Outdoor geeignet',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    hoehe: {
      id: 599,
      key: 'hoehe',
      label: 'Verpackungs-Höhe',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: '84,500',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    breite: {
      id: 600,
      key: 'breite',
      label: 'Verpackungs-Breite',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: '41,000',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    laenge: {
      id: 601,
      key: 'laenge',
      label: 'Verpackungs-Länge',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: '47,000',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    faserAnteil01: {
      id: 625,
      key: 'faserAnteil01',
      label: 'Faser Anteil 01',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: '98',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    faserAnteil02: {
      id: 626,
      key: 'faserAnteil02',
      label: 'Faser Anteil 02',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: '2',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    masterName: {
      id: 730,
      key: 'masterName',
      label: 'Frontend Name',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: 'Stuhl',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    sAPArtikelnummer: {
      id: 708,
      key: 'sAPArtikelnummer',
      label: 'SAP Artikelnummer',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: 'TPX0025230',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
    sAPProduktname: {
      id: 709,
      key: 'sAPProduktname',
      label: 'SAP Produktname',
      type: '',
      values: [
        {
          fieldSet: [
            [
              {
                value: 'Stuhl ca. B47xT41xH84cm, schwarz',
              },
            ],
          ],
          groupSet: [],
        },
      ],
    },
  },
  images: [
    {
      hash: 'images/7fb45e3c0d5e95529b5ee7a7f67874c5',
      attributes: {},
    },
    {
      hash: 'images/5b7abe96244fca8ef361cb4f226a4143',
      attributes: {},
    },
    {
      hash: 'images/d0cd832c14ee8a295b71bf149a1e438c',
      attributes: {},
    },
    {
      hash: 'images/4df92ec86a293b76b73f26d3b15f2fb0',
      attributes: {},
    },
    {
      hash: 'images/5119c4de4e9b50aa9c751ec5a88f8d2b',
      attributes: {
        imageTags: {
          id: 685,
          key: 'imageTags',
          label: 'Hover-Bild',
          type: '',
          multiSelect: true,
          values: [
            {
              id: 9056,
              label: 'Hover-Bild',
              value: 'mood',
            },
          ],
        },
      },
    },
    {
      hash: 'images/22cc0d8d03aa4abc2665d8bdc2f1ab25',
      attributes: {},
    },
    {
      hash: 'images/dc62994f787a155bbd300b901df4b84f',
      attributes: {},
    },
  ],
  variants: [
    ({
      id: 3093,
      referenceKey: 'TPX0025230',
      createdAt: '2019-08-28T08:28:03+00:00',
      updatedAt: '2020-01-02T15:42:36+00:00',
      price: {
        currencyCode: 'EUR',
        withTax: 15996,
        withoutTax: 13442,
        appliedReductions: [{ amount: { absoluteWithTax: 13000, relative: 30 } }],
        tax: {
          vat: {
            amount: 2554,
            rate: 0.19,
          },
        },
        reference: {
          withTax: 12000,
          size: 20,
          unit: 'cm',
        },
      },
      stock: {
        supplierId: 1000,
        quantity: 7,
        isSellableWithoutStock: false,
      },
    } as any) as Variant,
  ],
  siblings: [],
};
