import { create } from "zustand";
const renameTemplateStore = (set) => ({
    name:"",
    id:null,
    index:null,
    setRenameTemplateData:(index,id,name) => set(() => ({index,id,name})),
    setRenameTemplateName:(name) => set(() => ({name}))
})

export  const useRenameTemplateStore = create(renameTemplateStore)