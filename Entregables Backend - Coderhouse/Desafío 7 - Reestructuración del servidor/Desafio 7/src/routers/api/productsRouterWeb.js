/* productsRouter.get('/init', async (req, res) => {
    const dataSet = [
        { title: "Satiro Breezer", description: "Satiro Breezer Gravel/Urban 1x10", price: 999990, category: "Gravel", thumbnail: "Satirobreezer.jpg", code: "satirobr", stock: 10, status: true},
        { title: "Trek Marlin 5", description: "Trek Marlin 5 3x7", price: 399990, category: "MTB", thumbnail: "marlin5.jpg", code: "m5", stock: 10, status: true},
        { title: "Cube Attain", description: "Cube Attain Ruta 3x11", price: 1299990, category: "Ruta", thumbnail: "cubeattain.jpg", code: "cattain1", stock: 7, status: true},
        { title: "Giant Revolt 1 MY22", description: "Giant Revolt 1 MY22 2x10", price: 1249990, category: "Gravel", thumbnail: "grevolt1", code: "gr1", stock: 15, status: true},
        { title: "Oxford Orion 5", description: "Oxford Orion 5 3x7", price: 599990, category: "MTB", thumbnail: "oorion5", code: "oxfo5", stock: 15, status: true},
        { title: "Trek Marlin 7", description: "Trek Marlin 7 3x9", price: 599990, category: "MTB", thumbnail: "marlin7.jpg", code: "m7", stock: 5, status: true}
    ] 
    await Product.deleteMany()
    await Product.insertMany(dataSet)
    res.send('Base de datos creada')

}) */