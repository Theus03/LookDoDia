export interface Modal {
    title: string,
    type: 'Rename' | 'Folder',
    placeholder?: string,
    event?: Function
}