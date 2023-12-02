vim.o.number = true
vim.o.autoindent = true
vim.o.tabstop = 4
vim.o.shiftwidth = 4
vim.o.smarttab = true
vim.o.softtabstop = 4
vim.o.mouse = "a"
vim.o.encoding = "UTF-8"
vim.o.termguicolors = true 

-- Plugins using packer as a package manager 
return require('packer').startup(function()
    use 'vim-airline/vim-airline' -- Status bar
    use 'preservim/nerdtree' -- NerdTree
    use 'tpope/vim-surround' -- Surrounding (Kysw)
    use 'tpope/vim-commentary' -- For Commenting gcc & gc
    use 'ap/vim-css-color' -- CSS Color Preview
    use 'ryanoasis/vim-devicons' -- Developer Icons
    use 'tc50cal/vim-terminal' -- Vim Terminal
    use 'Mofiqul/dracula.nvim' -- Dracula theme on neovim 
    vim.cmd[[colorscheme dracula]] -- Turn on the theme 
    use 'sheerun/vim-polyglot' -- Syntax highlighter 
    use 'andweeb/presence.nvim' -- Neovim rich presence for discord 
    use 'rcarriga/nvim-notify' -- Notifications

    -- Maping of nerd three
    vim.api.nvim_set_keymap('n', '<C-f>', ':NERDTreeFocus<CR>', { noremap = true })
    vim.api.nvim_set_keymap('n', '<C-n>', ':NERDTree<CR>', { noremap = true })
    vim.api.nvim_set_keymap('n', '<C-t>', ':NERDTreeToggle<CR>', { noremap = true })

    vim.g.NERDTreeDirArrowExpandable = "+"
    vim.g.NERDTreeDirArrowCollapsible = "~"

    use {
    'goolord/alpha-nvim',
    requires = { 'nvim-tree/nvim-web-devicons' },
    config = function ()
        require'alpha'.setup(require'alpha.themes.startify'.config)
    end
}
end)








