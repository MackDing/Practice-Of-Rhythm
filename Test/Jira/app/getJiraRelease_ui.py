# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'getJiraRelease.ui'
##
## Created by: Qt User Interface Compiler version 6.7.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QApplication, QLineEdit, QPushButton, QSizePolicy,
    QTextEdit, QWidget)

class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(1068, 842)
        self.textEdit = QTextEdit(Form)
        self.textEdit.setObjectName(u"textEdit")
        self.textEdit.setGeometry(QRect(40, 69, 981, 261))
        self.pushButton = QPushButton(Form)
        self.pushButton.setObjectName(u"pushButton")
        self.pushButton.setGeometry(QRect(440, 360, 161, 41))
        self.textEdit_2 = QTextEdit(Form)
        self.textEdit_2.setObjectName(u"textEdit_2")
        self.textEdit_2.setGeometry(QRect(40, 440, 981, 351))
        self.lineEdit = QLineEdit(Form)
        self.lineEdit.setObjectName(u"lineEdit")
        self.lineEdit.setGeometry(QRect(40, 30, 961, 31))

        self.retranslateUi(Form)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.textEdit.setHtml(QCoreApplication.translate("Form", u"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'MS Shell Dlg 2'; font-size:7.8pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">category_dict = {</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">    'Commons': ['commons'],</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">    'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-serv"
                        "ice', 'document-service', 'irp-service', 'reports-service', 'customer-service', 'final-report-service', 'file-service', 'iptb-service'],</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">    'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'public-api', 'back-office', 'aims-web', 'program-web', 'exchange-console', 'backoffice-portal-web', 'checklist-web', 'gi-web', 'auditor-app', 'cia-new', 'B2b-service', 'iptb-web', 'b2b_dt_service'],</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">    'EKS': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud', 'lt-external-service-cloud', 'ai-service-cloud', 'e-signature-service-cloud', 'exchange-service-cloud', 'exchange-worker-service-cloud', 'finance-service-cloud', 'report-s"
                        "ervice-cloud', 'ordercore-service-cloud', 'file-service-cloud', 'payment-service-cloud', 'mail-service-cloud', 'document-generation-service-cloud']</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">}</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',</span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:10pt; font-weight:600;\">                    'LT-converter', 'LT-model', 'LT-utility']</span></p></body></html>", None))
        self.pushButton.setText(QCoreApplication.translate("Form", u"Get Release Services", None))
        self.lineEdit.setText(QCoreApplication.translate("Form", u"If you have any question, please let me konw. Thanks   Email: mack.ding@qima.com", None))
    # retranslateUi

