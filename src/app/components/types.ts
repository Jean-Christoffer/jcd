export type WorkItem = {
    title: string | null;
    description: string | null;
    categories: Array<{
        _id: string;
        title: string | null;
    }> | null;
    from: string | null;
    to: string | null;
}