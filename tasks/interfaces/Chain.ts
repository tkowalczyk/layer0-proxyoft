interface Chain {
    name: string,
    alchemyName: string,
    alchemyKey: string,
    chainId: number,
    address: string
};

export var chains: Chain[] = [
    {
        name: 'arbitrumGoerli',
        alchemyName: 'arbitrum-goerli',
        alchemyKey: `${process.env.ARB_GOERLI_ALCHEMY_API}`,
        chainId: 10143,
        address: '0xf95c39f613ad761E15F23048108146A5Df558fA2'
    },
    {
        name: 'polygonMumbai',
        alchemyName: 'maticmum',
        alchemyKey: `${process.env.PLG_MUMBAI_ALCHEMY_API}`,
        chainId: 10109,
        address: '0x85F4d06D1c5070b5e75F007f6D2F53CB5077369A'
    }
];