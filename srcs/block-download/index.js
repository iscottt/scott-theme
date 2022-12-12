export default ({ register_block_type }) => {
  register_block_type('scottstudio/download', {
    name: '下载链接',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M344 240h-56L287.1 152c0-13.25-10.75-24-24-24h-16C234.7 128 223.1 138.8 223.1 152L224 240h-56c-9.531 0-18.16 5.656-22 14.38C142.2 263.1 143.9 273.3 150.4 280.3l88.75 96C243.7 381.2 250.1 384 256.8 384c7.781-.3125 13.25-2.875 17.75-7.844l87.25-96c6.406-7.031 8.031-17.19 4.188-25.88S353.5 240 344 240zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/></svg>`,
    attributes: {
      need_reply: false,
      url: '',
      align: 'center',
      links() {
        return [
          // {url, title}
        ];
      },
    },
    sanitize(editor) {
      return {};
    },
    editor: {
      url: '/srcs/block-download/ui.vue',
    },
    settings: {
      url: '/srcs/block-download/settings_ui.vue',
    },
  });
};
