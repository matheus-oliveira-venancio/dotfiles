;;; custom.el -*- lexical-binding: t; -*-

;;(custom-set-variables
;; custom-set-variables was added by Custom.
;; If you edit it by hand, you could mess it up, so be careful.
;; Your init file should contain only one such instance.
;; If there is more than one, they won't work right.
'(custom-safe-themes
  '("e3daa8f18440301f3e54f2093fe15f4fe951986a8628e98dcd781efbec7a46f2" "8c7e832be864674c220f9a9361c851917a93f921fedb7717b1b5ece47690c098" default))
'(evil-normal-state-modes '(vc-git-log-view-mode) t)
'(magit-todos-insert-after '(bottom) nil nil "Changed by setter of obsolete option `magit-todos-insert-at'")
'(package-selected-packages '(elcord))
'(warning-suppress-log-types '((initialization) (initialization) (defvaralias)))
'(warning-suppress-types '((initialization) (defvaralias)))
                                        ;(custom-set-faces
;; custom-set-faces was added by Custom.
;; If you edit it by hand, you could mess it up, so be careful.
;; Your init file should contain only one such instance.
;; If there is more than one, they won't work right.
                                        ; )
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(ispell-dictionary nil)
 '(magit-todos-insert-after '(bottom) nil nil "Changed by setter of obsolete option `magit-todos-insert-at'")
 '(package-selected-packages
   '(i3wm-config-mode bash-completion lsp-treemacs tree-sitter project-explorer filetree elcord)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

(defun insert-inverted-question-mark ()
  "Insert inverted question mark."
  (interactive)
  (insert "¿ ?"))

(defun insert-inverted-exclamation-mark ()
  "Insert inverted exclamation mark."
  (interactive)
  (insert "¡ !"))

(map! :leader
      (:prefix "i"
       :desc "Insert inverted question mark" "i" #'insert-inverted-question-mark)
      (:prefix "i"
       :desc "Insert inverted exclamation mark" "!" #'insert-inverted-exclamation-mark))


;;Python Lsp

(after! lsp-mode
  (lsp-register-client
   (make-lsp-client :new-connection (lsp-stdio-connection '("pyls"))
                    :major-modes '(python-mode)
                    :server-id 'pyls)))


(setq explicit-shell-file-name "/usr/bin/kitty")
