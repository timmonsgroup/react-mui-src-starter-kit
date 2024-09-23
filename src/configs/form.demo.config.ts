import { FormDefinition } from "@models/form.model";
import {
  // BaseAppearance,
  LAYOUT_TYPES,
  DATA_FIELD_TYPES,
  // LayoutField,
} from "@models/layout.model";

import { createAcresModel, createAnyModel, createCurrencyModel, createPositiveCountModel, createTextModel } from "@helpers/helpers";
import { allFieldsAppearance, dividerAppearance } from "./form.shared.config";
import { FIELD_TYPES } from "@timmons-group/config-form";
import { createSummaryDef } from "@components/SummaryWidget";

export const VFA_FORM_LAYOUT = {
  id: 2,
  type: 1,
  // we flatten the sections array, but this helps dev brain
  sections: [
    {
      id: 1,
      editable: true,
      enabled: true,
      name: "Program Demand",
      order: 10,
      layout: [
        createTextModel("applicationName", "Application Name", true),
        createPositiveCountModel(
          "applicationsApproved",
          "Applications Approved",
          true
        ),
        createAcresModel("acres", "Acres", true),
        createCurrencyModel("costPerAcre", "Cost Per Acre", true),
        createAnyModel(FIELD_TYPES.CHOICE, "applicationType", "Application Type", true, {
          possibleChoices: [
            { id: "new", label: "New" },
            { id: "renewal", label: "Renewal" },
            { id: "modification", label: "Modification" },
            { id: "other", label: "Other" },
          ],
        }),
      ],
    },
  ],
};

// const baseAppearance: BaseAppearance = {
//   title: {
//     sx: {
//       marginBottom: 2,
//     },
//   },
//   description: {
//     sx: {
//       fontSize: 16,
//       fontStyle: "normal",
//       marginBottom: 2,
//     },
//   },
//   divider: {
//     sx: {
//       margin: "38px 0px",
//     },
//   },
//   panel: {
//     content: {
//       sx: {
//         padding: "24px",
//       },
//     },
//   },
// };

export const VFAFormDef: FormDefinition = {
  baseAppearance: {
    divider: dividerAppearance,
    allFields: allFieldsAppearance,
  },
  components: [
    {
      type: LAYOUT_TYPES.panel,
      key: "programDemand",
      title: "Program Demand",
      collapsible: true,
      components: [
        {
          key: 'someDescription',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
          type: 'description',
        },
        {
          type: 'divider',
        },
        {
          key: 'someTitle',
          title: 'Application Information',
          type: 'title',
          appearance: {
            sx: {
              marginBottom: 2,
              color: 'black',
            },
          },
        },
        {
          type: "columns",
          key: "columns",
          columns: [
            {
              width: 6,
              size: "md",
              components: [
                {
                  key: 'applicationName',
                  type: DATA_FIELD_TYPES.text,
                  input: true,
                },
              ],
            }
          ],
        },
        {
          type: "columns",
          key: "columns",
          columns: [
            {
              width: 4,
              size: "md",
              components: [
                {
                  key: 'applicationType',
                  type: DATA_FIELD_TYPES.text,
                  input: true,
                },
              ],
            },
            {
              width: 4,
              size: "md",
              components: [
                {
                  key: 'applicationsApproved',
                  type: DATA_FIELD_TYPES.int,
                  input: true,
                },
              ],
            }
          ],
        },
      ],
    },
    {
      type: LAYOUT_TYPES.panel,
      key: "programInvestments",
      title: "Questions about area",
      collapsible: true,
      components: [
        {
          key: 'progInvestTitle',
          title: 'A sub title with different styling',
          type: 'title',
          appearance: {
            sx: {
              fontSize: 16,
              marginBottom: 2,
            },
          },
        },
        {
          key: 'progInvestDesc',
          description: 'This is a description',
          type: 'description',
          appearance: {
            sx: {
              fontSize: 18,
              // fontStyle: "normal",
              marginTop: 2,
              marginBottom: 2,
            },
          },
        },
        {
          type: "columns",
          key: "columns",
          columns: [
            {
              width: 4,
              size: "md",
              components: [
                {
                  key: 'acres',
                  type: DATA_FIELD_TYPES.float,
                  input: true,
                },
              ],
            },
            {
              width: 4,
              size: "md",
              components: [
                {
                  key: 'costPerAcre',
                  type: DATA_FIELD_TYPES.currency,
                  input: true,
                },
              ],
            },
            {
              width: 4,
              size: "md",
              components: [
                createSummaryDef(
                  "totalPlannedCost",
                  "Total Planned Cost",
                  [],
                  ["applicationsApproved", "costPerAcre"],
                  "currency"
                ),
              ],
            }
          ],
        },
      ]
    }
  ],
};
