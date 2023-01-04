from flask_wtf import Form
from flask_wtf.file import FileField
from wtforms import SelectField, SubmitField, ValidationError, IntegerField, RadioField, BooleanField, validators, FormField
from wtforms.validators import DataRequired

class BlockchainArchType(Form):
    storage = BooleanField('Storage element')
    compute_elt = BooleanField('Computational element')
    asset_manager = BooleanField('Asset manager element')
    software_connector = BooleanField('Software connector')

class BlockchainFeatures(Form):
    cryptocurrencies = BooleanField('Cryptocurrencies')
    smart_contracts = BooleanField('Support of smart-contracts (embedded code inside the blockchain)')

class FeaturesForm(Form):
    blockchain_features = FormField(BlockchainFeatures, 'Blockchain features')
    blockchain_archtype = FormField(BlockchainArchType, 'Blockchain architectural type')

class SecurityForm(Form):
    scope = SelectField('Blockchain scope', choices=[('public', 'Public'), ('private', 'Private')], validators=[DataRequired()])
    data_access = SelectField('Data access', choices=[('unpermissionned', 'Unpermissionned'), ('permissionned', 'Permissionned')], validators=[DataRequired()])
    data_encryption = BooleanField('Native data encryption?')

class EfficiencyForm(Form):
    throughput = IntegerField('Throughput (tx/s)', validators=[DataRequired()])
    latency = IntegerField('Maximum latency', validators=[DataRequired()])
    energy_saving = BooleanField('Energy saving?')

class ReliabilityForm(Form):
    fault_tolerant = BooleanField('Fault tolerant?')
    byzantine_tolerant = BooleanField('Byzantine-fault tolerant?')

class NewBlockchainForm(Form):
    efficiency_subform = FormField(EfficiencyForm, 'Efficiency')
    security_subform = FormField(SecurityForm, 'Security')
    reliability_subform = FormField(ReliabilityForm, 'Reliability')
    features_subform = FormField(FeaturesForm, 'Features')
    submit_button = SubmitField('Save')