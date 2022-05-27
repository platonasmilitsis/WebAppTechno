const Navigate = (title) => {
    switch(title){
        case "Τεχνολογία":
            return("/home/technology");
        case "Σπίτι - Κήπος":
            return("/home/home-garden");
        case "Μόδα":
            return("/home/fashion");
        case "Hobby - Αθλητισμός":
            return("/home/hobby-sports");
        case "Υγεία - Ομορφιά":
            return("/home/health-beauty");
        case "Παιδικά - Βρεφικά":
            return("/home/childrenry");
        case "Auto - Moto":
            return("/home/auto-moto");
        case "Επαγγελματικά - B2B":
            return("/home/business-b2b");
        default:
            return("/");
    }
}

export default Navigate