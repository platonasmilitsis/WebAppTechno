const Navigate = (title) => {
    switch(title){
        case "Τεχνολογία":
            return(`/home/categories/1/${title}`);
        case "Σπίτι - Κήπος":
            return(`/home/categories/2/${title}`);
        case "Μόδα":
            return(`/home/categories/3/${title}`);
        case "Hobby - Αθλητισμός":
            return(`/home/categories/4/${title}`);
        case "Υγεία - Ομορφιά":
            return(`/home/categories/5/${title}`);
        case "Παιδικά - Βρεφικά":
            return(`/home/categories/6/${title}`);
        case "Auto - Moto":
            return(`/home/categories/7/${title}`);
        case "Επαγγελματικά - B2B":
            return(`/home/categories/8/${title}`);
        default:
            return("/");
    }
}

export default Navigate