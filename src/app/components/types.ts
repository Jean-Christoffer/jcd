export type CardItem = {
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
    site?: string | null;
    git?: string | null;
    from?: string | null;
    to?: string | null;
}

