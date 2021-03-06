module.exports = {
    title: 'Mac setup',
    description: 'Cloud Native Mac Setup',
    themeConfig: {
        repo: 'at15/cloud-native-mac-setup',
        editLinks: true,
        docsDir: 'docs',
        // nav: [
        //     {text: 'Guide', link: '/guide/'},
        // ],
        sidebar: [
            '/',
            '/get-started.md',
            '/go.md',
            '/k8s.md',
        ]
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-84338852-3'
            }
        ]
    ]
}