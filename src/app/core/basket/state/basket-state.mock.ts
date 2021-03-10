import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { BasketState, initialState } from './basket.reducers';

const response: () => BasketResponse = () =>
  JSON.parse(`{
  "type": "success",
  "basket": {
    "items": [
      {
        "key": "bca7d174d4387a5394a9c3d899091b2d",
        "packageId": 2,
        "quantity": 1,
        "status": "available",
        "displayData": {},
        "availableQuantity": 7,
        "deliveryForecast": {
          "deliverable": {
            "key": null,
            "quantity": 1
          },
          "subsequentDelivery": {
            "key": null,
            "quantity": 0
          }
        },
        "customData": {},
        "originalItemData": {
          "brand": null,
          "colors": [],
          "imageHash": "images/158571e466a45fe9be42ce4175c38b0a",
          "name": "Tisch Verbit mit Glasplatte, braun",
          "productId": 26716,
          "quantity": 1,
          "availableQuantity": 7,
          "variantId": 26884,
          "appliedPricePromotionKey": null
        },
        "price": {
          "total": {
            "currencyCode": "EUR",
            "withTax": 149900,
            "withoutTax": 125966,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 23934,
                "rate": 0.19
              }
            }
          },
          "unit": {
            "currencyCode": "EUR",
            "withTax": 149900,
            "withoutTax": 125966,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 23934,
                "rate": 0.19
              }
            }
          }
        },
        "variant": {
          "id": 26884,
          "referenceKey": "IHE0019400",
          "createdAt": "2020-02-18T05:47:50+00:00",
          "updatedAt": "2020-03-16T05:33:12+00:00",
          "price": {
            "currencyCode": "EUR",
            "withTax": 149900,
            "withoutTax": 125966,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 23934,
                "rate": 0.19
              }
            }
          },
          "stock": {
            "supplierId": 1002,
            "quantity": 7,
            "isSellableWithoutStock": false
          },
          "attributes": {
            "ean": {
              "id": 20009,
              "key": "ean",
              "label": "ean",
              "type": "",
              "multiSelect": false,
              "values": {
                "label": "ean",
                "value": ""
              }
            }
          },
          "advancedAttributes": {
            "eAN": {
              "id": 618,
              "key": "eAN",
              "label": "EAN",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "4051281230415"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            }
          }
        },
        "product": {
          "id": 26716,
          "isActive": true,
          "isSoldOut": false,
          "isNew": false,
          "createdAt": "2020-02-18T05:47:50+00:00",
          "updatedAt": "2020-03-10T15:16:52+00:00",
          "masterKey": "IHE0019_M",
          "referenceKey": "IHE0019400",
          "attributes": {
            "materialart": {
              "id": 24,
              "key": "materialart",
              "label": "Materialart",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 349,
                "label": "Handelsware",
                "value": "handelsware"
              }
            },
            "volumenUnit": {
              "id": 26,
              "key": "volumenUnit",
              "label": "Volumen_Unit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 361,
                "label": "cdm",
                "value": "cdm"
              }
            },
            "materialklasse": {
              "id": 27,
              "key": "materialklasse",
              "label": "Materialklasse",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 366,
                "label": "Möbel Indoor",
                "value": "moebel_indoor"
              }
            },
            "gewichtsEinheit": {
              "id": 30,
              "key": "gewichtsEinheit",
              "label": "Gewichts_Einheit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 439,
                "label": "KG",
                "value": "kg"
              }
            },
            "konfigurierbarkeit": {
              "id": 32,
              "key": "konfigurierbarkeit",
              "label": "Konfigurierbarkeit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 474,
                "label": "X",
                "value": "x"
              }
            },
            "masseinheitAbmessungen": {
              "id": 33,
              "key": "masseinheitAbmessungen",
              "label": "Maßeinheit Abmessungen",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 475,
                "label": "CM",
                "value": "cm"
              }
            },
            "herstellungsland": {
              "id": 31,
              "key": "herstellungsland",
              "label": "Herstellungsland",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3692,
                "label": "Litauen",
                "value": "litauen"
              }
            },
            "wasserdicht": {
              "id": 573,
              "key": "wasserdicht",
              "label": "wasserdicht",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1242,
                "label": "nein",
                "value": "nein"
              }
            },
            "faser01": {
              "id": 20,
              "key": "faser01",
              "label": "Faser_01",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 150,
                "label": "Eichenholz (Quercus robur)",
                "value": "eiche_quercus_robur"
              }
            },
            "faser02": {
              "id": 21,
              "key": "faser02",
              "label": "Faser_02",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 242,
                "label": "Glas",
                "value": "glas"
              }
            },
            "faser03": {
              "id": 22,
              "key": "faser03",
              "label": "Faser_03",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 309,
                "label": "Stahl",
                "value": "stahl"
              }
            },
            "anlieferart": {
              "id": 23,
              "key": "anlieferart",
              "label": "Anlieferart",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 346,
                "label": "Streckenabwicklung (Hermes)",
                "value": "streckenabwicklung_hermes"
              }
            },
            "produktBreite": {
              "id": 553,
              "key": "produktBreite",
              "label": "ProduktBreite",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1781,
                "label": "100",
                "value": "100_cm"
              }
            },
            "produktHoehe": {
              "id": 554,
              "key": "produktHoehe",
              "label": "ProduktHöhe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1432,
                "label": "75",
                "value": "75_cm_1"
              }
            },
            "produktLaenge": {
              "id": 555,
              "key": "produktLaenge",
              "label": "ProduktLänge",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 2300,
                "label": "220",
                "value": "220_cm"
              }
            },
            "frostsicher": {
              "id": 572,
              "key": "frostsicher",
              "label": "frostsicher",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1240,
                "label": "nein",
                "value": "nein"
              }
            },
            "outdoorgeeignet": {
              "id": 574,
              "key": "outdoorgeeignet",
              "label": "outdoorgeeignet",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1244,
                "label": "nein",
                "value": "nein"
              }
            },
            "tischUnterteiler": {
              "id": 608,
              "key": "tischUnterteiler",
              "label": "Tisch Unterteiler",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3321,
                "label": "Esstisch",
                "value": "esstisch"
              }
            },
            "artikelTyp": {
              "id": 630,
              "key": "artikelTyp",
              "label": "Artikel Typ",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3925,
                "label": "Sammelartikel",
                "value": "sammelartikel"
              }
            },
            "plusproduktOverwrite": {
              "id": 653,
              "key": "plusproduktOverwrite",
              "label": "Plusprodukt aktivieren",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 7337,
                "label": "Default = SAP",
                "value": "default_sap"
              }
            },
            "produktMasseinheiten": {
              "id": 679,
              "key": "produktMasseinheiten",
              "label": "Haupt-Maßeinheit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9044,
                "label": "cm",
                "value": "cm"
              }
            },
            "hauptmaterial": {
              "id": 585,
              "key": "hauptmaterial",
              "label": "Material",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1269,
                "label": "Holz",
                "value": "holz"
              }
            },
            "formFarbabweichung": {
              "id": 66,
              "key": "formFarbabweichung",
              "label": "Form- & Farbabweichung",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 604,
                "label": "Holz ist ein Naturprodukt – leichte Form- und Farbabweichungen möglich.",
                "value": "holz_ist_ein_naturprodukt_leichte_form_und_farbabweichungen_moeglich"
              }
            },
            "isFurniture": {
              "id": 60,
              "key": "isFurniture",
              "label": "IsFurniture",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 565,
                "label": "True",
                "value": "true"
              }
            },
            "vasenGroesse": {
              "id": 617,
              "key": "vasenGroesse",
              "label": "Vasen Größe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3370,
                "label": "groß",
                "value": "gross"
              }
            },
            "farbe": {
              "id": 2,
              "key": "farbe",
              "label": "Farbe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 19,
                "label": "braun",
                "value": "braun"
              }
            },
            "onlineShopStatusAT": {
              "id": 4,
              "key": "onlineShopStatusAT",
              "label": "Online-Shop_Status_AT",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 85,
                "label": "aktiver Artikel",
                "value": "aktiver_artikel"
              }
            },
            "onlineShopStatusCH": {
              "id": 5,
              "key": "onlineShopStatusCH",
              "label": "Online-Shop_Status_CH",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 97,
                "label": "aktiver Artikel",
                "value": "aktiver_artikel"
              }
            },
            "onlineShopStatusDE": {
              "id": 6,
              "key": "onlineShopStatusDE",
              "label": "Online-Shop_Status_DE",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 113,
                "label": "Onlineshop",
                "value": "onlineshop"
              }
            },
            "quantityProductLosgroesse": {
              "id": 7,
              "key": "quantityProductLosgroesse",
              "label": "Quantity-Product Losgröße",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 122,
                "label": "1",
                "value": "1"
              }
            },
            "mengeneinheitQuantityProducts": {
              "id": 8,
              "key": "mengeneinheitQuantityProducts",
              "label": "Mengeneinheit_Quantity_Products",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 127,
                "label": "ST",
                "value": "st"
              }
            },
            "saison": {
              "id": 19,
              "key": "saison",
              "label": "Saison_Kennzeichen",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 131,
                "label": "Ganzjahresartikel",
                "value": "ganzjahresartikel"
              }
            },
            "saisonJahr": {
              "id": 25,
              "key": "saisonJahr",
              "label": "Saison_Jahr",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3750,
                "label": "2020",
                "value": "2020"
              }
            },
            "nOSALEDED": {
              "id": 47,
              "key": "nOSALEDED",
              "label": "NO_SALE_DE_D",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 7338,
                "label": "Sell",
                "value": "sell"
              }
            },
            "fSCFreigabe": {
              "id": 717,
              "key": "fSCFreigabe",
              "label": "FSC Freigabe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9348,
                "label": "Nicht benötigt",
                "value": "nicht_benoetigt"
              }
            },
            "feStoererAt": {
              "id": 733,
              "key": "feStoererAt",
              "label": "Störer FE | AT",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 9553,
                  "label": "Unikat",
                  "value": "unikat"
                }
              ]
            },
            "stoererFECHDE": {
              "id": 762,
              "key": "stoererFECHDE",
              "label": "Störer FE | CH-DE",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 9740,
                  "label": "Unikat",
                  "value": "unikat"
                }
              ]
            },
            "feStoererCh": {
              "id": 734,
              "key": "feStoererCh",
              "label": "Störer FE | CH-FR",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 9564,
                  "label": "Unikat",
                  "value": "unikat"
                }
              ]
            },
            "feStoererDe": {
              "id": 731,
              "key": "feStoererDe",
              "label": "Störer FE | DE",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 9547,
                  "label": "Unikat",
                  "value": "unikat"
                },
                {
                  "id": 9550,
                  "label": "Online Collection",
                  "value": "online_collection"
                }
              ]
            },
            "suchfarbe": {
              "id": 704,
              "key": "suchfarbe",
              "label": "Farbe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9169,
                "label": "Braun",
                "value": "braun"
              }
            },
            "saleInShopAT": {
              "id": 87,
              "key": "saleInShopAT",
              "label": "SaleInShop_AT",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 674,
                "label": "Sale",
                "value": "sale"
              }
            },
            "saleInShopCH": {
              "id": 88,
              "key": "saleInShopCH",
              "label": "SaleInShop_CH",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 677,
                "label": "Sale",
                "value": "sale"
              }
            },
            "saleInShopDE": {
              "id": 86,
              "key": "saleInShopDE",
              "label": "SaleInShop_DE",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 671,
                "label": "Sale",
                "value": "sale"
              }
            },
            "new": {
              "id": 1,
              "key": "new",
              "label": "new",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9205,
                "label": "new_dede",
                "value": "new_dede"
              }
            },
            "name": {
              "id": 20005,
              "key": "name",
              "label": "Name",
              "type": null,
              "multiSelect": false,
              "values": {
                "label": "Tisch Verbit mit Glasplatte, braun"
              }
            },
            "description": {
              "id": 20006,
              "key": "description",
              "label": "Description",
              "type": null,
              "multiSelect": false,
              "values": {
                "label": ""
              }
            }
          },
          "advancedAttributes": {
            "bestelltextDE": {
              "id": 38,
              "key": "bestelltextDE",
              "label": "Bestelltext_DE",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "\\nOnline\\n9611-0-AP-KD\\n-packing: 1/1 ( 3 Kolli )\\n-packing details: Corner Protection with Styrofoam or\\n                  three layers of carton\\n Protection for table top with Styrofoam or fleece\\n Legs fixed at the bottom of table top\\n Legs packed into bubble foil or carton\\n-warning label: max. Belastbarkeit\\n-assembling an care instruction  in german, french,\\n italian and english\\n-Produktion nach DIN 68885, DIN EN 14072,\\n DIN EN 12521\\n-Restfeuchte: max. 12%"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "grundlagenTextDE": {
              "id": 39,
              "key": "grundlagenTextDE",
              "label": "Grundlagen_Text_DE",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "\\nMaterial: Eiche, Quercus"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "breite": {
              "id": 600,
              "key": "breite",
              "label": "Verpackungs-Breite",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "100,000"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "faserAnteil01": {
              "id": 625,
              "key": "faserAnteil01",
              "label": "Faser Anteil 01",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "49"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "faserAnteil02": {
              "id": 626,
              "key": "faserAnteil02",
              "label": "Faser Anteil 02",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "33"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "faserAnteil03": {
              "id": 627,
              "key": "faserAnteil03",
              "label": "Faser Anteil 03",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "18"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "produktBeschreibung": {
              "id": 693,
              "key": "produktBeschreibung",
              "label": "ProduktBeschreibung",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Mit diesem Tisch hält ein Stück absoluter Top-Designkunst Einzug in Ihren Wohn- oder Arbeitsbereich. Die Platte besteht aus rustikalem Eichenholz, das von einer Glasplatte gewollt inkongruent bedeckt wird. So entsteht eine ebene Arbeits- oder Essoberfläche, ohne dass Sie auf den natürlichen Look des organischen Materials verzichten müssten. So vereint die Gestaltung der Unikate traditionelle Materialien mit einem modernen Aussehen."
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "masterName": {
              "id": 730,
              "key": "masterName",
              "label": "Frontend Name",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Esstisch Verbit mit Glasplatte"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "sapProduktname": {
              "id": 754,
              "key": "sapProduktname",
              "label": "SAP Produktname",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Tisch Verbit mit Glasplatte"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "sAPArtikelnummer": {
              "id": 708,
              "key": "sAPArtikelnummer",
              "label": "SAP Artikelnummer",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "IHE0019400"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            }
          },
          "images": [
            {
              "hash": "images/158571e466a45fe9be42ce4175c38b0a",
              "attributes": {}
            },
            {
              "hash": "images/8449cd95af4ef70e21df8e1a26b94cf3",
              "attributes": {}
            },
            {
              "hash": "images/952c044e9af5c79f4d105eb7fced6dee",
              "attributes": {}
            },
            {
              "hash": "images/cc8c9080788c217f7f00d2a7813d654e",
              "attributes": {}
            },
            {
              "hash": "images/91e6d257d0d1a19fa9751cf23e5b03a1",
              "attributes": {}
            },
            {
              "hash": "images/3d2682d060bf26b8eb86fe6622ad690c",
              "attributes": {}
            },
            {
              "hash": "images/47ab7e6560d210771980c319481f28cd",
              "attributes": {}
            }
          ],
          "variants": [
            {
              "id": 26884,
              "referenceKey": "IHE0019400",
              "createdAt": "2020-02-18T05:47:50+00:00",
              "updatedAt": "2020-03-16T05:33:12+00:00",
              "price": {
                "currencyCode": "EUR",
                "withTax": 149900,
                "withoutTax": 125966,
                "appliedReductions": [],
                "tax": {
                  "vat": {
                    "amount": 23934,
                    "rate": 0.19
                  }
                }
              },
              "stock": {
                "supplierId": 1002,
                "quantity": 7,
                "isSellableWithoutStock": false
              }
            }
          ],
          "siblings": [],
          "categories": [
            [
              {
                "categoryId": 69,
                "categoryName": "Möbel",
                "categoryUrl": "/moebel",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 69,
                "categoryName": "Möbel",
                "categoryUrl": "/moebel",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 70,
                "categoryName": "Tische",
                "categoryUrl": "/moebel/tische",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 69,
                "categoryName": "Möbel",
                "categoryUrl": "/moebel",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 70,
                "categoryName": "Tische",
                "categoryUrl": "/moebel/tische",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              },
              {
                "categoryId": 71,
                "categoryName": "Esstische",
                "categoryUrl": "/moebel/tische/esstische",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 602,
                "categoryName": "TEST",
                "categoryUrl": "/test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 602,
                "categoryName": "TEST",
                "categoryUrl": "/test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 611,
                "categoryName": "ALL Products for Test",
                "categoryUrl": "/test/all-products-for-test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ]
          ]
        }
      },
      {
        "key": "4158f6d19559955bae372bb00f6204e4",
        "packageId": 1,
        "quantity": 4,
        "status": "available",
        "displayData": {},
        "availableQuantity": 21,
        "deliveryForecast": {
          "deliverable": {
            "key": null,
            "quantity": 4
          },
          "subsequentDelivery": {
            "key": null,
            "quantity": 0
          }
        },
        "customData": {},
        "originalItemData": {
          "brand": null,
          "colors": [],
          "imageHash": "images/feaa2b5b16bc303281d684a18b8ad344",
          "name": "Schwimmring GLAM ca. D109cm, lila",
          "productId": 7985,
          "quantity": 4,
          "availableQuantity": 21,
          "variantId": 7986,
          "appliedPricePromotionKey": null
        },
        "price": {
          "total": {
            "currencyCode": "EUR",
            "withTax": 5196,
            "withoutTax": 4368,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 828,
                "rate": 0.19
              }
            }
          },
          "unit": {
            "currencyCode": "EUR",
            "withTax": 1299,
            "withoutTax": 1092,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 207,
                "rate": 0.19
              }
            }
          }
        },
        "variant": {
          "id": 7986,
          "referenceKey": "DIG0059169",
          "createdAt": "2019-08-28T09:23:25+00:00",
          "updatedAt": "2020-01-31T05:33:19+00:00",
          "price": {
            "currencyCode": "EUR",
            "withTax": 1299,
            "withoutTax": 1092,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 207,
                "rate": 0.19
              }
            }
          },
          "stock": {
            "supplierId": 1000,
            "quantity": 21,
            "isSellableWithoutStock": false
          },
          "attributes": {
            "ean": {
              "id": 20009,
              "key": "ean",
              "label": "ean",
              "type": "",
              "multiSelect": false,
              "values": {
                "label": "ean",
                "value": "4051281555372"
              }
            }
          },
          "advancedAttributes": {
            "eAN": {
              "id": 618,
              "key": "eAN",
              "label": "EAN",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "4051281555372"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            }
          }
        },
        "product": {
          "id": 7985,
          "isActive": true,
          "isSoldOut": false,
          "isNew": false,
          "createdAt": "2019-08-28T09:23:25+00:00",
          "updatedAt": "2020-01-30T14:53:45+00:00",
          "masterKey": "DIG0059_M",
          "referenceKey": "DIG0059169",
          "attributes": {
            "materialart": {
              "id": 24,
              "key": "materialart",
              "label": "Materialart",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 349,
                "label": "Handelsware",
                "value": "handelsware"
              }
            },
            "volumenUnit": {
              "id": 26,
              "key": "volumenUnit",
              "label": "Volumen_Unit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 361,
                "label": "cdm",
                "value": "cdm"
              }
            },
            "materialklasse": {
              "id": 27,
              "key": "materialklasse",
              "label": "Materialklasse",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 377,
                "label": "Spiele/Sport",
                "value": "spielesport"
              }
            },
            "gewichtsEinheit": {
              "id": 30,
              "key": "gewichtsEinheit",
              "label": "Gewichts_Einheit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 439,
                "label": "KG",
                "value": "kg"
              }
            },
            "herstellungsland": {
              "id": 31,
              "key": "herstellungsland",
              "label": "Herstellungsland",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 441,
                "label": "China",
                "value": "china"
              }
            },
            "konfigurierbarkeit": {
              "id": 32,
              "key": "konfigurierbarkeit",
              "label": "Konfigurierbarkeit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 474,
                "label": "X",
                "value": "x"
              }
            },
            "masseinheitAbmessungen": {
              "id": 33,
              "key": "masseinheitAbmessungen",
              "label": "Maßeinheit Abmessungen",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 475,
                "label": "CM",
                "value": "cm"
              }
            },
            "faser01": {
              "id": 20,
              "key": "faser01",
              "label": "Faser_01",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 184,
                "label": "Polyvinylchlorid",
                "value": "polyvinylchlorid"
              }
            },
            "faser02": {
              "id": 21,
              "key": "faser02",
              "label": "Faser_02",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 6693,
                "label": "Polyethylenterephthalat (PET)",
                "value": "polyethylenterephthalat_pet"
              }
            },
            "anlieferart": {
              "id": 23,
              "key": "anlieferart",
              "label": "Anlieferart",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 345,
                "label": "Standardabwicklung (Dekoartikel)",
                "value": "standardabwicklung_dekoartikel"
              }
            },
            "einkufergruppe": {
              "id": 29,
              "key": "einkufergruppe",
              "label": "Einkäufergruppe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 411,
                "label": "Bodo Angerstein",
                "value": "bodo_angerstein"
              }
            },
            "warnhinweise": {
              "id": 64,
              "key": "warnhinweise",
              "label": "Warnhinweise",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 597,
                  "label": "Achtung! Nicht geeignet für Kinder unter 3 Jahren! Erstickungsgefahr.",
                  "value": "achtung_nicht_geeignet_fuer_kinder_unter_3_jahren_erstickungsgefahr_aufgrund_verschluckbarer_kleinteile"
                }
              ]
            },
            "produktDurchmesser": {
              "id": 556,
              "key": "produktDurchmesser",
              "label": "ProduktDurchmesser",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3087,
                "label": "109",
                "value": "109_cm"
              }
            },
            "balkonGartendekoUnterteiler": {
              "id": 615,
              "key": "balkonGartendekoUnterteiler",
              "label": "Balkon- & Gartendeko Unterteiler",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3359,
                "label": "Luftmatratze",
                "value": "luftmatratze"
              }
            },
            "lieferantenKuerzel": {
              "id": 620,
              "key": "lieferantenKuerzel",
              "label": "Lieferanten Kürzel",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 5802,
                "label": "DIG",
                "value": "dig"
              }
            },
            "artikelTyp": {
              "id": 630,
              "key": "artikelTyp",
              "label": "Artikel Typ",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3925,
                "label": "Sammelartikel",
                "value": "sammelartikel"
              }
            },
            "farbe": {
              "id": 2,
              "key": "farbe",
              "label": "Farbe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 8,
                "label": "lila",
                "value": "lila"
              }
            },
            "quantityProductLosgroesse": {
              "id": 7,
              "key": "quantityProductLosgroesse",
              "label": "Quantity-Product Losgröße",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 122,
                "label": "1",
                "value": "1"
              }
            },
            "mengeneinheitQuantityProducts": {
              "id": 8,
              "key": "mengeneinheitQuantityProducts",
              "label": "Mengeneinheit_Quantity_Products",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 127,
                "label": "ST",
                "value": "st"
              }
            },
            "saison": {
              "id": 19,
              "key": "saison",
              "label": "Saison_Kennzeichen",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 137,
                "label": "Sommer/Herbst",
                "value": "sommerherbst"
              }
            },
            "saisonJahr": {
              "id": 25,
              "key": "saisonJahr",
              "label": "Saison_Jahr",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 351,
                "label": "2019",
                "value": "2019"
              }
            },
            "fSCFreigabe": {
              "id": 717,
              "key": "fSCFreigabe",
              "label": "FSC Freigabe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9348,
                "label": "Nicht benötigt",
                "value": "nicht_benoetigt"
              }
            },
            "onlineShopStatusAT": {
              "id": 4,
              "key": "onlineShopStatusAT",
              "label": "Online-Shop_Status_AT",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 89,
                "label": "(F) Artikelsperre manuell",
                "value": "f_artikelsperre_manuell"
              }
            },
            "onlineShopStatusCH": {
              "id": 5,
              "key": "onlineShopStatusCH",
              "label": "Online-Shop_Status_CH",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 96,
                "label": "(F) Einlagerung",
                "value": "f_einlagerung"
              }
            },
            "onlineShopStatusDE": {
              "id": 6,
              "key": "onlineShopStatusDE",
              "label": "Online-Shop_Status_DE",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 110,
                "label": "aktiver Artikel",
                "value": "aktiver_artikel"
              }
            },
            "geschenke": {
              "id": 588,
              "key": "geschenke",
              "label": "Geschenke",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 1279,
                  "label": "für Frauen",
                  "value": "fuer_frauen"
                }
              ]
            },
            "isFurniture": {
              "id": 60,
              "key": "isFurniture",
              "label": "IsFurniture",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 566,
                "label": "False",
                "value": "false"
              }
            },
            "saleInShopDE": {
              "id": 86,
              "key": "saleInShopDE",
              "label": "SaleInShop_DE",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 671,
                "label": "Sale",
                "value": "sale"
              }
            },
            "saleInShopAT": {
              "id": 87,
              "key": "saleInShopAT",
              "label": "SaleInShop_AT",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 673,
                "label": "NoSale",
                "value": "nosale"
              }
            },
            "saleInShopCH": {
              "id": 88,
              "key": "saleInShopCH",
              "label": "SaleInShop_CH",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 677,
                "label": "Sale",
                "value": "sale"
              }
            },
            "hauptmaterial": {
              "id": 585,
              "key": "hauptmaterial",
              "label": "Material",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3381,
                "label": "Kunststoff",
                "value": "kunststoff"
              }
            },
            "suchfarbe": {
              "id": 704,
              "key": "suchfarbe",
              "label": "Farbe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9163,
                "label": "Beere",
                "value": "beere"
              }
            },
            "wasserdicht": {
              "id": 573,
              "key": "wasserdicht",
              "label": "wasserdicht",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1242,
                "label": "nein",
                "value": "nein"
              }
            },
            "plusproduktOverwrite": {
              "id": 653,
              "key": "plusproduktOverwrite",
              "label": "Plusprodukt aktivieren",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 7337,
                "label": "Default = SAP",
                "value": "default_sap"
              }
            },
            "nOSALEDED": {
              "id": 47,
              "key": "nOSALEDED",
              "label": "NO_SALE_DE_D",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 7338,
                "label": "Sell",
                "value": "sell"
              }
            },
            "produktMasseinheiten": {
              "id": 679,
              "key": "produktMasseinheiten",
              "label": "Haupt-Maßeinheit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9044,
                "label": "cm",
                "value": "cm"
              }
            },
            "name": {
              "id": 20005,
              "key": "name",
              "label": "Name",
              "type": null,
              "multiSelect": false,
              "values": {
                "label": "Schwimmring GLAM ca. D109cm, lila"
              }
            },
            "description": {
              "id": 20006,
              "key": "description",
              "label": "Description",
              "type": null,
              "multiSelect": false,
              "values": {
                "label": ""
              }
            }
          },
          "advancedAttributes": {
            "bestelltextEN": {
              "id": 10,
              "key": "bestelltextEN",
              "label": "Bestelltext_EN",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "\\nB1-HW1-A1 Cool at the pool\\nswim ring GLAM, ca.D109cm\\n - with pre-shipment inspection\\n - with manual\\nPacking: artwork box with warnings and order number\\nPrice label: Sticking label small on the artwork box\\nWarnings:\\nOn artwork:\\nPlease note the mentioned symbols\\nPlease check enclosed manual\\nNot suitable for children below 3 years\\nUse only under supervision of an adult\\nUse only in flat water under supervision of an adult\\nChildrens Head, CE logo, Charge no. and address\\n6+, max. weight suggestion (45kg)\\nOn item:\\nNot suitable for children below 3 years\\nUse only under supervision of an adult\\nUse only in flat water under supervision of an adult\\nCE logo, production date, address, item no.\\nRequired certificates:\\nREACH\\nEN71 part 1,2,3\\nCadmium, PAHs, Phatalate\\nCE conformity\\n_________________________________________\\n90% PVC, 10% PET\\n"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "hoehe": {
              "id": 599,
              "key": "hoehe",
              "label": "Verpackungs-Höhe",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "18,000"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "breite": {
              "id": 600,
              "key": "breite",
              "label": "Verpackungs-Breite",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "93,000"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "laenge": {
              "id": 601,
              "key": "laenge",
              "label": "Verpackungs-Länge",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "93,000"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "faserAnteil01": {
              "id": 625,
              "key": "faserAnteil01",
              "label": "Faser Anteil 01",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "90"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "faserAnteil02": {
              "id": 626,
              "key": "faserAnteil02",
              "label": "Faser Anteil 02",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "10"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "masterName": {
              "id": 730,
              "key": "masterName",
              "label": "Frontend Name",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Schwimmring Glam"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "sAPArtikelnummer": {
              "id": 708,
              "key": "sAPArtikelnummer",
              "label": "SAP Artikelnummer",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "DIG0059169"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "sapProduktname": {
              "id": 754,
              "key": "sapProduktname",
              "label": "SAP Produktname",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Schwimmring GLAM ca. D109cm"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            }
          },
          "images": [
            {
              "hash": "images/feaa2b5b16bc303281d684a18b8ad344",
              "attributes": {}
            },
            {
              "hash": "images/e0abfa23e835bc89adfa8f50e2742de1",
              "attributes": {}
            },
            {
              "hash": "images/3fdbed39a42ea65449b2be9dee785168",
              "attributes": {}
            },
            {
              "hash": "images/7b7b2a2b2f01c7072e5fd9f6a0ffe011",
              "attributes": {}
            }
          ],
          "variants": [
            {
              "id": 7986,
              "referenceKey": "DIG0059169",
              "createdAt": "2019-08-28T09:23:25+00:00",
              "updatedAt": "2020-01-31T05:33:19+00:00",
              "price": {
                "currencyCode": "EUR",
                "withTax": 1299,
                "withoutTax": 1092,
                "appliedReductions": [],
                "tax": {
                  "vat": {
                    "amount": 207,
                    "rate": 0.19
                  }
                }
              },
              "stock": {
                "supplierId": 1000,
                "quantity": 21,
                "isSellableWithoutStock": false
              }
            }
          ],
          "siblings": [],
          "categories": [
            [
              {
                "categoryId": 299,
                "categoryName": "Balkon & Garten",
                "categoryUrl": "/balkon-garten",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 299,
                "categoryName": "Balkon & Garten",
                "categoryUrl": "/balkon-garten",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 316,
                "categoryName": "Luftmatratzen",
                "categoryUrl": "/balkon-garten/luftmatratzen",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 99,
                "categoryName": "Geschenke",
                "categoryUrl": "/geschenke",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 99,
                "categoryName": "Geschenke",
                "categoryUrl": "/geschenke",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 609,
                "categoryName": "Geschenkeguide",
                "categoryUrl": "/geschenke/geschenkeguide",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 99,
                "categoryName": "Geschenke",
                "categoryUrl": "/geschenke",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 609,
                "categoryName": "Geschenkeguide",
                "categoryUrl": "/geschenke/geschenkeguide",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              },
              {
                "categoryId": 104,
                "categoryName": "Geschenke für Frauen",
                "categoryUrl": "/geschenke/geschenkeguide/geschenke-fuer-frauen",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 602,
                "categoryName": "TEST",
                "categoryUrl": "/test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 602,
                "categoryName": "TEST",
                "categoryUrl": "/test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 611,
                "categoryName": "ALL Products for Test",
                "categoryUrl": "/test/all-products-for-test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ]
          ]
        }
      },
      {
        "key": "669c35c595fa7abcc0b82d0ba7d90f66",
        "packageId": 1,
        "quantity": 1,
        "status": "available",
        "displayData": {},
        "availableQuantity": 1,
        "deliveryForecast": {
          "deliverable": {
            "key": null,
            "quantity": 1
          },
          "subsequentDelivery": {
            "key": null,
            "quantity": 0
          }
        },
        "customData": {},
        "originalItemData": {
          "brand": null,
          "colors": [],
          "imageHash": "images/ecb7eeb772f1a7dbe72ca6f626d871ad",
          "name": "Windlicht MUSCHEL Glas ca.D10xH12, weiss",
          "productId": 24911,
          "quantity": 1,
          "availableQuantity": 1,
          "variantId": 24911,
          "appliedPricePromotionKey": null
        },
        "price": {
          "total": {
            "currencyCode": "EUR",
            "withTax": 799,
            "withoutTax": 671,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 128,
                "rate": 0.19
              }
            }
          },
          "unit": {
            "currencyCode": "EUR",
            "withTax": 799,
            "withoutTax": 671,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 128,
                "rate": 0.19
              }
            }
          }
        },
        "variant": {
          "id": 24911,
          "referenceKey": "XMM0143270",
          "createdAt": "2019-12-12T17:38:35+00:00",
          "updatedAt": "2020-03-11T10:53:30+00:00",
          "price": {
            "currencyCode": "EUR",
            "withTax": 799,
            "withoutTax": 671,
            "appliedReductions": [],
            "tax": {
              "vat": {
                "amount": 128,
                "rate": 0.19
              }
            }
          },
          "stock": {
            "supplierId": 1000,
            "quantity": 1,
            "isSellableWithoutStock": false
          },
          "attributes": {
            "ean": {
              "id": 20009,
              "key": "ean",
              "label": "ean",
              "type": "",
              "multiSelect": false,
              "values": {
                "label": "ean",
                "value": ""
              }
            }
          },
          "advancedAttributes": {
            "eAN": {
              "id": 618,
              "key": "eAN",
              "label": "EAN",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "4051281385405"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            }
          }
        },
        "product": {
          "id": 24911,
          "isActive": true,
          "isSoldOut": false,
          "isNew": false,
          "createdAt": "2019-12-12T17:38:35+00:00",
          "updatedAt": "2020-03-11T10:53:30+00:00",
          "masterKey": "XMM0143_M",
          "referenceKey": "XMM0143270",
          "attributes": {
            "onlineShopStatusAT": {
              "id": 4,
              "key": "onlineShopStatusAT",
              "label": "Online-Shop_Status_AT",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 84,
                "label": "(F) Einlagerung",
                "value": "f_einlagerung"
              }
            },
            "onlineShopStatusCH": {
              "id": 5,
              "key": "onlineShopStatusCH",
              "label": "Online-Shop_Status_CH",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 96,
                "label": "(F) Einlagerung",
                "value": "f_einlagerung"
              }
            },
            "onlineShopStatusDE": {
              "id": 6,
              "key": "onlineShopStatusDE",
              "label": "Online-Shop_Status_DE",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 109,
                "label": "(F) Einlagerung",
                "value": "f_einlagerung"
              }
            },
            "materialart": {
              "id": 24,
              "key": "materialart",
              "label": "Materialart",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 349,
                "label": "Handelsware",
                "value": "handelsware"
              }
            },
            "volumenUnit": {
              "id": 26,
              "key": "volumenUnit",
              "label": "Volumen_Unit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 362,
                "label": "m³",
                "value": "m3"
              }
            },
            "materialklasse": {
              "id": 27,
              "key": "materialklasse",
              "label": "Materialklasse",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 390,
                "label": "Kerzenhalter/ Windlichter/ Teelichthalter/ Laternen/ Tüllen",
                "value": "kerzenhalter_windlichter_teelichthalter_laternen_tuellen"
              }
            },
            "gewichtsEinheit": {
              "id": 30,
              "key": "gewichtsEinheit",
              "label": "Gewichts_Einheit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 439,
                "label": "KG",
                "value": "kg"
              }
            },
            "herstellungsland": {
              "id": 31,
              "key": "herstellungsland",
              "label": "Herstellungsland",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 441,
                "label": "China",
                "value": "china"
              }
            },
            "konfigurierbarkeit": {
              "id": 32,
              "key": "konfigurierbarkeit",
              "label": "Konfigurierbarkeit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 474,
                "label": "X",
                "value": "x"
              }
            },
            "masseinheitAbmessungen": {
              "id": 33,
              "key": "masseinheitAbmessungen",
              "label": "Maßeinheit Abmessungen",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 475,
                "label": "CM",
                "value": "cm"
              }
            },
            "lieferantenKuerzel": {
              "id": 620,
              "key": "lieferantenKuerzel",
              "label": "Lieferanten Kürzel",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 6381,
                "label": "XMM",
                "value": "xmm"
              }
            },
            "saleInShopDE": {
              "id": 86,
              "key": "saleInShopDE",
              "label": "SaleInShop_DE",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 671,
                "label": "Sale",
                "value": "sale"
              }
            },
            "saleInShopAT": {
              "id": 87,
              "key": "saleInShopAT",
              "label": "SaleInShop_AT",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 674,
                "label": "Sale",
                "value": "sale"
              }
            },
            "saleInShopCH": {
              "id": 88,
              "key": "saleInShopCH",
              "label": "SaleInShop_CH",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 677,
                "label": "Sale",
                "value": "sale"
              }
            },
            "wasserdicht": {
              "id": 573,
              "key": "wasserdicht",
              "label": "wasserdicht",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1242,
                "label": "nein",
                "value": "nein"
              }
            },
            "nOSALEDED": {
              "id": 47,
              "key": "nOSALEDED",
              "label": "NO_SALE_DE_D",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 7338,
                "label": "Sell",
                "value": "sell"
              }
            },
            "faser01": {
              "id": 20,
              "key": "faser01",
              "label": "Faser_01",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 143,
                "label": "Glas",
                "value": "glas"
              }
            },
            "anlieferart": {
              "id": 23,
              "key": "anlieferart",
              "label": "Anlieferart",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 345,
                "label": "Standardabwicklung (Dekoartikel)",
                "value": "standardabwicklung_dekoartikel"
              }
            },
            "einkufergruppe": {
              "id": 29,
              "key": "einkufergruppe",
              "label": "Einkäufergruppe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 434,
                "label": "Sabrina Hanaman",
                "value": "sabrina_hanaman"
              }
            },
            "maxKerzenhoehe": {
              "id": 78,
              "key": "maxKerzenhoehe",
              "label": "Maximale Kerzenhöhe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9654,
                "label": "Maximale Kerzenhöhe: 6cm",
                "value": "kerzenhoehe_6cm"
              }
            },
            "produktHoehe": {
              "id": 554,
              "key": "produktHoehe",
              "label": "ProduktHöhe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 1306,
                "label": "12",
                "value": "12_cm"
              }
            },
            "produktDurchmesser": {
              "id": 556,
              "key": "produktDurchmesser",
              "label": "ProduktDurchmesser",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 2898,
                "label": "10",
                "value": "10_cm"
              }
            },
            "artikelTyp": {
              "id": 630,
              "key": "artikelTyp",
              "label": "Artikel Typ",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3925,
                "label": "Sammelartikel",
                "value": "sammelartikel"
              }
            },
            "zimmer": {
              "id": 643,
              "key": "zimmer",
              "label": "Zimmer",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 6982,
                  "label": "Wohnzimmer",
                  "value": "wohnzimmer"
                },
                {
                  "id": 6975,
                  "label": "Flur",
                  "value": "flur"
                },
                {
                  "id": 6976,
                  "label": "Badezimmer",
                  "value": "badezimmer"
                },
                {
                  "id": 6977,
                  "label": "Schlafzimmer",
                  "value": "schlafzimmer"
                },
                {
                  "id": 6979,
                  "label": "Küche",
                  "value": "kueche"
                },
                {
                  "id": 6980,
                  "label": "Esszimmer",
                  "value": "esszimmer"
                },
                {
                  "id": 6981,
                  "label": "Arbeitszimmer",
                  "value": "arbeitszimmer"
                }
              ]
            },
            "plusproduktOverwrite": {
              "id": 653,
              "key": "plusproduktOverwrite",
              "label": "Plusprodukt aktivieren",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 7337,
                "label": "Default = SAP",
                "value": "default_sap"
              }
            },
            "stil": {
              "id": 673,
              "key": "stil",
              "label": "Wohnstil",
              "type": "",
              "multiSelect": true,
              "values": [
                {
                  "id": 8222,
                  "label": "Maritim",
                  "value": "martim"
                }
              ]
            },
            "produktMasseinheiten": {
              "id": 679,
              "key": "produktMasseinheiten",
              "label": "Haupt-Maßeinheit",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9044,
                "label": "cm",
                "value": "cm"
              }
            },
            "hauptmaterial": {
              "id": 585,
              "key": "hauptmaterial",
              "label": "Material",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3382,
                "label": "Glas",
                "value": "glas"
              }
            },
            "isFurniture": {
              "id": 60,
              "key": "isFurniture",
              "label": "IsFurniture",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 566,
                "label": "False",
                "value": "false"
              }
            },
            "vasenGroesse": {
              "id": 617,
              "key": "vasenGroesse",
              "label": "Vasen Größe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3372,
                "label": "klein",
                "value": "klein"
              }
            },
            "tellerType": {
              "id": 602,
              "key": "tellerType",
              "label": "Teller Typ",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 3294,
                "label": "Dessert- & Frühstücksteller",
                "value": "dessert_fruehstuecksteller"
              }
            },
            "farbe": {
              "id": 2,
              "key": "farbe",
              "label": "Farbe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 5,
                "label": "weiß",
                "value": "weiss"
              }
            },
            "quantityProductLosgroesse": {
              "id": 7,
              "key": "quantityProductLosgroesse",
              "label": "Quantity-Product Losgröße",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 122,
                "label": "1",
                "value": "1"
              }
            },
            "mengeneinheitQuantityProducts": {
              "id": 8,
              "key": "mengeneinheitQuantityProducts",
              "label": "Mengeneinheit_Quantity_Products",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 127,
                "label": "ST",
                "value": "st"
              }
            },
            "saison": {
              "id": 19,
              "key": "saison",
              "label": "Saison_Kennzeichen",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 129,
                "label": "Sommer",
                "value": "sommer"
              }
            },
            "saisonJahr": {
              "id": 25,
              "key": "saisonJahr",
              "label": "Saison_Jahr",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 351,
                "label": "2019",
                "value": "2019"
              }
            },
            "fSCFreigabe": {
              "id": 717,
              "key": "fSCFreigabe",
              "label": "FSC Freigabe",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9348,
                "label": "Nicht benötigt",
                "value": "nicht_benoetigt"
              }
            },
            "new": {
              "id": 1,
              "key": "new",
              "label": "new",
              "type": "",
              "multiSelect": false,
              "values": {
                "id": 9205,
                "label": "new_dede",
                "value": "new_dede"
              }
            },
            "name": {
              "id": 20005,
              "key": "name",
              "label": "Name",
              "type": null,
              "multiSelect": false,
              "values": {
                "label": "Windlicht MUSCHEL Glas ca.D10xH12, weiss"
              }
            },
            "description": {
              "id": 20006,
              "key": "description",
              "label": "Description",
              "type": null,
              "multiSelect": false,
              "values": {
                "label": ""
              }
            }
          },
          "advancedAttributes": {
            "bestelltextEN": {
              "id": 10,
              "key": "bestelltextEN",
              "label": "Bestelltext_EN",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "\\nKerzenhalter\\nGlass tealight holder\\npacking: IC= 4pcs/ OC= 24pcs\\nuse sticking label size medium\\nposition: stick on the bottom of the item\\nwarning label \\"Max. candleheight 6cm\\" requested\\norder only valid against valid REACH certificate\\n-------------------------------------------\\nmat.: 100% glass, maschine made, CN\\n"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "faserAnteil01": {
              "id": 625,
              "key": "faserAnteil01",
              "label": "Faser Anteil 01",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "100"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "produktBeschreibung": {
              "id": 693,
              "key": "produktBeschreibung",
              "label": "ProduktBeschreibung",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Suchst Du nach einem schönen Mitbringsel für eine bevorstehende Einladung? Wie wäre es mit diesem neuen Windlicht, welches im angesagten Muscheldesign ab sofort erhältlich ist? Passende Kerzen kannst Du übrigens gleich mitbestellen. Auch andere Varianten sind unter den Neuheiten erhältlich."
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "masterName": {
              "id": 730,
              "key": "masterName",
              "label": "Frontend Name",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Windlicht Muschel"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "sapProduktname": {
              "id": 754,
              "key": "sapProduktname",
              "label": "SAP Produktname",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "Windlicht MUSCHEL Glas ca.D10xH12"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            },
            "sAPArtikelnummer": {
              "id": 708,
              "key": "sAPArtikelnummer",
              "label": "SAP Artikelnummer",
              "type": "",
              "values": [
                {
                  "fieldSet": [
                    [
                      {
                        "value": "XMM0143270"
                      }
                    ]
                  ],
                  "groupSet": []
                }
              ]
            }
          },
          "images": [
            {
              "hash": "images/ecb7eeb772f1a7dbe72ca6f626d871ad",
              "attributes": {}
            },
            {
              "hash": "images/ff7ee7ded0e86e953d6dae9aa6ff9fff",
              "attributes": {}
            },
            {
              "hash": "images/da15cc20b2ba12a9a4ead4a33eefbc14",
              "attributes": {}
            },
            {
              "hash": "images/20a73b8fdbecdeaa78b62577a7aef40a",
              "attributes": {}
            }
          ],
          "variants": [
            {
              "id": 24911,
              "referenceKey": "XMM0143270",
              "createdAt": "2019-12-12T17:38:35+00:00",
              "updatedAt": "2020-03-11T10:53:30+00:00",
              "price": {
                "currencyCode": "EUR",
                "withTax": 799,
                "withoutTax": 671,
                "appliedReductions": [],
                "tax": {
                  "vat": {
                    "amount": 128,
                    "rate": 0.19
                  }
                }
              },
              "stock": {
                "supplierId": 1000,
                "quantity": 1,
                "isSellableWithoutStock": false
              }
            }
          ],
          "siblings": [],
          "categories": [
            [
              {
                "categoryId": 299,
                "categoryName": "Balkon & Garten",
                "categoryUrl": "/balkon-garten",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 299,
                "categoryName": "Balkon & Garten",
                "categoryUrl": "/balkon-garten",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 320,
                "categoryName": "Balkonbeleuchtung & Gartenbeleuchtung",
                "categoryUrl": "/balkon-garten/balkonbeleuchtung-gartenbeleuchtung",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 299,
                "categoryName": "Balkon & Garten",
                "categoryUrl": "/balkon-garten",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 320,
                "categoryName": "Balkonbeleuchtung & Gartenbeleuchtung",
                "categoryUrl": "/balkon-garten/balkonbeleuchtung-gartenbeleuchtung",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              },
              {
                "categoryId": 325,
                "categoryName": "Windlichter & Laternen",
                "categoryUrl": "/balkon-garten/balkonbeleuchtung-gartenbeleuchtung/windlichter-laternen",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 486,
                "categoryName": "Deko & Wohnaccessoires",
                "categoryUrl": "/deko-wohnaccessoires",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  },
                  {
                    "name": "Short Slug",
                    "value": "Deko & Wohnen",
                    "is_inheritable": 0
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 486,
                "categoryName": "Deko & Wohnaccessoires",
                "categoryUrl": "/deko-wohnaccessoires",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  },
                  {
                    "name": "Short Slug",
                    "value": "Deko & Wohnen",
                    "is_inheritable": 0
                  }
                ]
              },
              {
                "categoryId": 533,
                "categoryName": "Kerzen & Windlichter & mehr",
                "categoryUrl": "/deko-wohnaccessoires/kerzen-windlichter-mehr",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 486,
                "categoryName": "Deko & Wohnaccessoires",
                "categoryUrl": "/deko-wohnaccessoires",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  },
                  {
                    "name": "Short Slug",
                    "value": "Deko & Wohnen",
                    "is_inheritable": 0
                  }
                ]
              },
              {
                "categoryId": 533,
                "categoryName": "Kerzen & Windlichter & mehr",
                "categoryUrl": "/deko-wohnaccessoires/kerzen-windlichter-mehr",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              },
              {
                "categoryId": 548,
                "categoryName": "Windlichter",
                "categoryUrl": "/deko-wohnaccessoires/kerzen-windlichter-mehr/windlichter",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 602,
                "categoryName": "TEST",
                "categoryUrl": "/test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              }
            ],
            [
              {
                "categoryId": 602,
                "categoryName": "TEST",
                "categoryUrl": "/test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten",
                    "is_inheritable": 1
                  }
                ]
              },
              {
                "categoryId": 611,
                "categoryName": "ALL Products for Test",
                "categoryUrl": "/test/all-products-for-test",
                "categoryHidden": false,
                "categoryProperties": [
                  {
                    "name": "Saison",
                    "value": "Winter, Weihnachten"
                  }
                ]
              }
            ]
          ]
        }
      }
    ],
    "packages": [
      {
        "carrierKey": "DHL",
        "deliveryDate": {
          "max": "2020-03-26",
          "min": "2020-03-24"
        },
        "id": 1
      },
      {
        "carrierKey": "HERMES",
        "deliveryDate": {
          "max": "2020-03-26",
          "min": "2020-03-24"
        },
        "id": 2
      }
    ],
    "cost": {
      "currencyCode": "EUR",
      "withTax": 155895,
      "withoutTax": 131005,
      "appliedReductions": []
    }
  }
}
`);

export const createBasketStateMock: () => BasketState = () => {
  return {
    ...initialState,
    data: response(),
    isLoading: false,
  };
};
