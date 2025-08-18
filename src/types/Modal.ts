export interface Modal {
    title: string,
    type: 'Rename' | 'Folder',
    theme: 'warning' | 'success',
    placeholder?: string,
    event?: Function
}