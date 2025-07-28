
export interface BreadPath {
    name: string,
    path: string
}
export interface BreadcrumbProps {
    pageTitle: string;
    paths?: BreadPath[]
}