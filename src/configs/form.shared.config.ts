import { Appearance } from "@models/layout.model";

export const dividerAppearance: Appearance = {
  sx: {
    marginTop: 2,
    marginBottom: 2,
  }
}

export const fieldMeta = {
  fieldOptions: {
    icon: {
      style: {
        color: '#003C83',
        fontSize: 20,
        top: 4,
        position: 'relative'
      }
    }
  }
}

export const allFieldsAppearance: Appearance = {
  meta: fieldMeta,
  sx: {
    marginBottom: 2
  }
}