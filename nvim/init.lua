vim.o.number = true
vim.o.autoindent = true
vim.o.tabstop = 4
vim.o.shiftwidth = 4
vim.o.smarttab = true
vim.o.softtabstop = 4
vim.o.mouse = "a"
vim.o.encoding = "UTF-8"

-- Plugins using packer as a package manager 
return require('packer').startup(function()
    use 'vim-airline/vim-airline' -- Status bar
    use 'preservim/nerdtree' -- NerdTree
    use 'tpope/vim-surround' -- Surrounding (Kysw)
    use 'tpope/vim-commentary' -- For Commenting gcc & gc
    use 'ap/vim-css-color' -- CSS Color Preview
    use 'rafi/awesome-vim-colorschemes' -- Retro Scheme
    use 'ryanoasis/vim-devicons' -- Developer Icons
    use 'tc50cal/vim-terminal' -- Vim Terminal
    use 'terryma/vim-multiple-cursors' -- CTRL + N for multiple cursors
    use 'Mofiqul/dracula.nvim' -- Dracula theme for neovim 
    use 'sheerun/vim-polyglot' -- Syntax highlighter 
    use 'andweeb/presence.nvim' -- Neovim rich presence for discord 

    -- Maping of nerd three
    vim.api.nvim_set_keymap('n', '<C-f>', ':NERDTreeFocus<CR>', { noremap = true })
    vim.api.nvim_set_keymap('n', '<C-n>', ':NERDTree<CR>', { noremap = true })
    vim.api.nvim_set_keymap('n', '<C-t>', ':NERDTreeToggle<CR>', { noremap = true })

    vim.g.NERDTreeDirArrowExpandable = "+"
    vim.g.NERDTreeDirArrowCollapsible = "~"
end)

-- add 
