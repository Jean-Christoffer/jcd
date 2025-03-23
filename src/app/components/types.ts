export type WorkItem = {
    title: string | null;
    description: string | null;
    categories: Array<{
        _id: string;
        title: string | null;
        slug: {
            _type: "slug";
            current?: string;
            source?: string;
        } | null
    }> | null;
    from: string | null;
    to: string | null;
}

