export interface Modal {
    title: string,
    type: 'Rename' | 'Folder',
    value?: string,
    event?: Function
}