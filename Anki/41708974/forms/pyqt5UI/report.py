# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'designer/report.ui'
#
# Created by: PyQt5 UI code generator 5.15.6
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_Dialog(object):
    def setupUi(self, Dialog):
        Dialog.setObjectName("Dialog")
        Dialog.resize(368, 161)
        self.gridLayout = QtWidgets.QGridLayout(Dialog)
        self.gridLayout.setObjectName("gridLayout")
        self.sendReport = QtWidgets.QPushButton(Dialog)
        self.sendReport.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.sendReport.setObjectName("sendReport")
        self.gridLayout.addWidget(self.sendReport, 2, 0, 1, 1)
        self.reportReason = QtWidgets.QTextEdit(Dialog)
        self.reportReason.setObjectName("reportReason")
        self.gridLayout.addWidget(self.reportReason, 1, 0, 1, 1)
        self.reportLabel = QtWidgets.QLabel(Dialog)
        self.reportLabel.setObjectName("reportLabel")
        self.gridLayout.addWidget(self.reportLabel, 0, 0, 1, 1)

        self.retranslateUi(Dialog)
        QtCore.QMetaObject.connectSlotsByName(Dialog)
        Dialog.setTabOrder(self.reportReason, self.sendReport)

    def retranslateUi(self, Dialog):
        _translate = QtCore.QCoreApplication.translate
        Dialog.setWindowTitle(_translate("Dialog", "Report user"))
        self.sendReport.setText(_translate("Dialog", "Report user"))
        self.reportReason.setHtml(_translate("Dialog", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:7.8pt; font-weight:400; font-style:normal;\">\n"
"<p style=\"-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><br /></p></body></html>"))
        self.reportLabel.setText(_translate("Dialog", "Please explain why you want to report [user]:"))
