// import { create } from 'zustand';
// import { useShallow } from 'zustand/react/shallow';
// import {
//   BUSINESS_STATES,
//   type BusinessRule,
//   getBusinessRules
// } from '@services/businessRules.service';

// type BusinessRulesStore = {
//   businessRules: BusinessRule[];
//   rulesLoading: boolean;
//   rulesLoaded: boolean;
//   rulesError: boolean;
//   errorMessage: string | null;
//   fetchRules: () => void;
// };

// const initialState: Partial<BusinessRulesStore> = {
//   businessRules: [],
//   rulesLoading: false,
//   rulesLoaded: false,
//   rulesError: false,
//   errorMessage: null,
// };

// export const useBusinessRulesStore = create<BusinessRulesStore>((set, get) => ({
//   ...initialState as BusinessRulesStore,
//   fetchRules: async () => {
//     const { rulesLoading: loading, rulesLoaded: loaded } = get();
//     if (loading || loaded) {
//       return;
//     }

//     set({ rulesLoading: true, rulesLoaded: false, rulesError: false, errorMessage: null });
//     try {
//       const response = await getBusinessRules();
//       if (response.type === BUSINESS_STATES.LOADED) {
//         set({ businessRules: response.data, rulesLoading: false, rulesLoaded: true });
//       } else if (response.type === BUSINESS_STATES.FAILED) {
//         set({ rulesLoading: false, rulesError: true, errorMessage: response.error });
//       }
//     } catch (error) {
//       set({ rulesLoading: false, rulesError: true, errorMessage: 'An error occurred while fetching business rules' });
//     }
//   }
// }));

// export const useBusinessState = () => useBusinessRulesStore((
//   useShallow((state) => ({
//     businessRules: state.businessRules,
//     rulesLoaded: state.rulesLoaded,
//     rulesLoading: state.rulesLoading,
//     rulesError: state.rulesError,
//     errorMessage: state.errorMessage,
//   }))
// ));

// export const useBusinessFetchRules = () => useBusinessRulesStore((state) => state.fetchRules);
