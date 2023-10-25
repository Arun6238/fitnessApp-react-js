import  {create} from "zustand"

const confirmationDialogStore = (set) => ({
    show:false,
    title:"",
    message:"",
    action:null,
    setConfirm:({title,message,action}) => set(() => ({title,message,action,show:true})),
    clearConfirm:() => set(() => ({show:false,title:"",message:"",action:"",}))
})

export  const useConfirmationDialog = create(confirmationDialogStore)