# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'designer/achievement.ui'
#
# Created by: PyQt5 UI code generator 5.15.6
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_Dialog(object):
    def setupUi(self, Dialog):
        Dialog.setObjectName("Dialog")
        Dialog.resize(358, 279)
        Dialog.setAutoFillBackground(False)
        Dialog.setStyleSheet("")
        self.confetti = QtWidgets.QLabel(Dialog)
        self.confetti.setGeometry(QtCore.QRect(9, 9, 341, 261))
        self.confetti.setAutoFillBackground(False)
        self.confetti.setStyleSheet("QLabel{background:lightblue}")
        self.confetti.setText("")
        self.confetti.setAlignment(QtCore.Qt.AlignCenter)
        self.confetti.setObjectName("confetti")
        self.message = QtWidgets.QLabel(Dialog)
        self.message.setGeometry(QtCore.QRect(80, 120, 187, 40))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift")
        font.setPointSize(20)
        self.message.setFont(font)
        self.message.setText("")
        self.message.setAlignment(QtCore.Qt.AlignCenter)
        self.message.setObjectName("message")

        self.retranslateUi(Dialog)
        QtCore.QMetaObject.connectSlotsByName(Dialog)

    def retranslateUi(self, Dialog):
        _translate = QtCore.QCoreApplication.translate
        Dialog.setWindowTitle(_translate("Dialog", "Leaderboard"))
