import {create} from "zustand"

const editTemplateStore = (set) => ({
    templateToEdit:null,
    id:null,
    edit:false,
    setTemplate : (template) =>set(()=>({templateToEdit:template,id:template.id,edit:true})),
    clearTemplate:() => set(() => ({templateToEdit:null,edit:false}))
})

export const useEditTemplateStore = create(editTemplateStore)