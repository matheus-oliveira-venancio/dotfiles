# Dotfiles

I created this project as a backup for my dotfiles and to assist people.

## How to Use

To use my dot files, you need to follow these steps:

1. **Install all dependencies**.
2. **Copy the configuration files** to the correct folders.

## How to Install Dependencies

To install the dependencies, follow the steps below:

- **Install i3 dependencies:**
    ```shell
    sudo pacman -S i3
    ```

- **Install polybar dependencies:**
    ```shell
    sudo pacman -S polybar
    ```

- **Install rofi dependencies:**
    ```shell
    sudo pacman -S rofi
    ```

- **Install nvim dependencies:**
    ```shell
    sudo pacman -S  neovim
    ```

- **Install zsh dependencies:**
    ```shell
    sudo pacman -S zsh
    run: chsh -s /bin/zsh seeni to make as your default shell
    ```

### i3
#### i3 Configuration
- **Installation:**
    ```shell
    sudo pacman -S i3
    ```
- **Configuration:**
    ```shell
    cp i3/config ~/.config/i3/config
    ```

### polybar
#### polybar Configuration
- **Installation:**
    ```shell
    sudo pacman -S polybar
    ```
- **Configuration:**
    ```shell
    cp polybar/config ~/.config/polybar/config
    ```
- **Dependencies:**
    ```shell
    sudo pacman -S polybar
    ```

### rofi
#### rofi Configuration
- **Installation:**
    ```shell
    sudo pacman -S rofi
    ```
- **Configuration:**
    ```shell
    cp rofi/config ~/.config/rofi/config
    ```
- **Dependencies:**
    ```shell
    sudo pacman -S rofi
    ```

### vim
#### vim Configuration
- **Installation:**
    ```shell
    sudo pacman -S neovim
    ```
- **Configuration:**
    ```shell
    cp vim/vimrc ~/.vimrc
    ```
