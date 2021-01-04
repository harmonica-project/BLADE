//this variable defines the current struct of fields needed by BLADE to work; will be removed later
exports.struct = [
    {
        name: "Security",
        fields: [
            {
                name: "Public blockchain",
                key: "public",
                type: "boolean"
            },
            {
                name: "Permissionned blockchain",
                key: "permissionned",
                type: "boolean"
            },
            {
                name: "Native data encryption",
                key: "nativeDataEncryption",
                type: "boolean"
            },
        ]
    },
    {
        name: "Performance efficiency",
        fields: [
            {
                name: "Throughput",
                key: "throughput",
                type: "numeric",
                placeholder: "Type your desired throughput ...",
                unit: "tx/s"
            },
            {
                name: "Latency",
                key: "latency",
                type: "numeric",
                placeholder: "Type your desired latency ...",
                unit: "s"
            },
            {
                name: "Energy efficient",
                key: "energySaving",
                type: "boolean"
            },
        ]
    },
    {
        name: "Reliability",
        fields: [
            {
                name: "Byzantine-fault tolerance",
                key: "byzantineProof",
                type: "numeric",
                placeholder: "Type your desired resistance percentage ...",
                unit: "%"
            }
        ]
    },
    {
        name: "Functionnality",
        fields: [
            {
                name: "Smart-contracts",
                key: "smartContract",
                type: "boolean"
            },
            {
                name: "Cryptocurrencies",
                key: "cryptocurrency",
                type: "boolean"
            },
            {
                name: "Storage element functionnalities",
                key: "storageElt",
                type: "select",
                options: [
                    {name: "No", value: 0},
                    {name: "Basic", value: 0.3},
                    {name: "Advanced", value: 0.8}
                ]
            },
            {
                name: "Computational element functionnalities",
                key: "computationalElt",
                type: "select",
                options: [
                    {name: "No", value: 0},
                    {name: "Basic", value: 0.3},
                    {name: "Advanced", value: 0.8}
                ]
            },
            {
                name: "Asset management functionnalities",
                key: "assetMgElt",
                type: "select",
                options: [
                    {name: "No", value: 0},
                    {name: "Basic", value: 0.3},
                    {name: "Advanced", value: 0.8}
                ]
            },
            {
                name: "Software connector functionnalities",
                key: "softwareConnectorElt",
                type: "select",
                options: [
                    {name: "No", value: 0},
                    {name: "Basic", value: 0.3},
                    {name: "Advanced", value: 0.8}
                ]
            },
        ]
    },
    {
        name: "Usability",
        fields: [
            {
                name: "Learning curve",
                key: "learningCurve",
                type: "select",
                options: [
                    {name: "Low", value: 0.2},
                    {name: "Medium", value: 0.4},
                    {name: "High", value: 0.6},
                    {name: "Very high", value: 0.8},
                ]
            }
        ]
    }
];