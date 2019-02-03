export let MENU_ITEM = [
    {
        path: 'rotaspossiveis',
        title: 'Rotas possíveis',
        icon: 'pencil'
    },
    {
        path: 'cadastro',
        title: 'Cadastros',
        icon: 'paint-brush',
        children: [
            {
                path: 'collaborator',
                title: 'Colaborador'
            },
            {
                path: 'store',
                title: 'Estabelecimento'
            },
            {
                path: 'city',
                title: 'Cidade'
            }
        ]
    }
];
