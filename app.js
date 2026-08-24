// My AI Rank — bilingual models + harnesses ranking board
const EN_TIER_ORDER = ['S+','A','B','C','D','F'];
const ZH_TIERS = [
  { key: 'S+', label: '夯', source: ['S+'] },
  { key: 'A', label: '顶级', source: ['A'] },
  { key: 'B', label: '人上人', source: ['B'] },
  { key: 'C', label: 'NPC', source: ['C'] },
  { key: 'F', label: '拉完了', source: ['D', 'F'] }
];

const PROVIDERS = {
  openai: {
    name: 'OpenAI',
    bg: '#0b0b0c',
    color: '#ffffff',
    type: 'svg',
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
  },
  anthropic: {
    name: 'Anthropic',
    bg: '#CC785C',
    color: '#ffffff',
    type: 'svg',
    path: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
  },
  grok: {
    name: 'Grok',
    bg: '#0b0b0c',
    type: 'img',
    img: 'logos/grok.png'
  },
  xai: {
    name: 'xAI',
    bg: '#0b0b0c',
    color: '#ffffff',
    type: 'svg',
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  },
  deepseek: {
    name: 'DeepSeek',
    bg: '#4D6BFA',
    color: '#ffffff',
    type: 'svg',
    path: "M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"
  },
  google: {
    name: 'Google',
    bg: '#ffffff',
    color: '#4285F4',
    type: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"/><path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"/></svg>'
  },
  kimi: {
    name: 'Kimi',
    bg: '#000000',
    color: '#ffffff',
    type: 'svg',
    path: "M21.765.351C22.998.351 24 1.353 24 2.586S22.998 4.82 21.765 4.82h-1.974c-.15 0-.26-.12-.26-.26V2.586A2.237 2.237 0 0 1 21.765.35M9.41 13.388l8.447-8.377c.16-.16.07-.471-.14-.471h-4.55s-.1.02-.14.06l-9.099 9.029c-.14.14-.35.02-.35-.21V4.81c0-.15-.1-.27-.221-.27H.22c-.12 0-.22.12-.22.27v18.57c0 .15.1.27.22.27h3.137c.12 0 .22-.12.22-.27v-3.79c0-.08.03-.16.08-.21l2.826-2.796c.07-.07.16-.08.241-.03l7.546 5.551a8.9 8.9 0 0 0 4.018 1.493c.12.01.23-.11.23-.27V19.76c0-.14-.08-.25-.19-.26a5.8 5.8 0 0 1-2.355-.942l-6.533-4.73c-.14-.09-.15-.32-.03-.441"
  },
  qwen: {
    name: 'Qwen',
    bg: '#615ced',
    color: '#ffffff',
    type: 'svg',
    path: "M23.919 14.545 20.817 9.17l1.47-2.544a.56.56 0 0 0 0-.566l-1.633-2.83a.57.57 0 0 0-.49-.283h-6.207L12.487.402a.57.57 0 0 0-.49-.284H8.732a.56.56 0 0 0-.49.284L5.139 5.775h-2.94a.56.56 0 0 0-.49.284L.077 8.887a.56.56 0 0 0 0 .567L3.18 14.83l-1.47 2.545a.56.56 0 0 0 0 .566l1.634 2.83a.57.57 0 0 0 .49.283h6.205l1.47 2.545a.57.57 0 0 0 .49.284h3.266a.57.57 0 0 0 .49-.284l3.104-5.375h2.94a.57.57 0 0 0 .49-.283l1.634-2.828a.55.55 0 0 0-.004-.568M8.733.686l1.634 2.828-1.634 2.828H21.8L20.164 9.17H7.425L5.63 6.06Zm1.306 19.801-6.205-.002 1.634-2.83h3.265L2.201 6.344h3.267q3.182 5.517 6.367 11.032zm10.124-5.66L18.53 12l-6.532 11.315-1.634-2.83c2.129-3.673 4.25-7.351 6.373-11.028h3.592l3.102 5.374z"
  },
  zhipu: {
    name: 'Zhipu',
    bg: '#2d2d2d',
    color: '#ffffff',
    type: 'svg',
    viewBox: '0 0 24 24',
    path: "M12.606 1.806l-1.677 2.388c-0.258 0.374-0.697 0.606-1.161 0.606h-9.162V1.794C.594 1.806 12.606 1.806 12.606 1.806zM24 1.806L9.6 22.206 0 22.206 14.4 1.806zM11.394 22.206l1.69-2.4c.258-.374 .697-.606 1.161-.606h9.149v3.006H11.394z"
  },
  fable: {
    name: 'Fable',
    bg: '#FF6B35',
    color: '#ffffff',
    type: 'text',
    initial: 'F'
  },
  meta: {
    name: 'Meta',
    bg: '#0b0b0c',
    color: '#ffffff',
    type: 'svg',
    path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
  },
  devin: {
    name: 'Devin',
    bg: '#0b0b0c',
    type: 'img',
    img: 'logos/devin.png'
  },
  cognition: {
    name: 'Cognition',
    bg: '#0b0b0c',
    color: '#ffffff',
    type: 'svg',
    paths: [
      "M13.2603 8.85657C13.6689 8.62171 14.174 8.62171 14.5826 8.85657L15.6386 9.46628C15.6723 9.48514 15.7089 9.5 15.746 9.51028C15.7534 9.51314 15.7609 9.51485 15.7694 9.516C15.806 9.52457 15.8431 9.52914 15.8797 9.53085H15.8854C15.89 9.53085 15.8929 9.53085 15.8974 9.52914C15.9311 9.52914 15.9649 9.52343 15.9986 9.516C16.0043 9.516 16.0106 9.51428 16.0163 9.51143C16.0517 9.50114 16.0866 9.48628 16.1191 9.46914C16.122 9.46743 16.1266 9.46628 16.1294 9.46457L18.2403 8.24514C18.3917 8.15828 18.4843 7.99714 18.4843 7.82228V5.384C18.4843 5.20914 18.3917 5.04742 18.2403 4.96114L16.1294 3.74171C15.978 3.65485 15.7917 3.65485 15.6403 3.74171L13.5294 4.96114C13.5294 4.96114 13.5237 4.96571 13.5209 4.96685C13.4889 4.98571 13.4574 5.00971 13.4311 5.036C13.4266 5.04057 13.4237 5.04457 13.4191 5.04914C13.3957 5.07428 13.3751 5.10228 13.3563 5.13142C13.3534 5.136 13.3506 5.14 13.3477 5.14628C13.33 5.17885 13.3151 5.21257 13.3049 5.24914C13.302 5.25657 13.3003 5.264 13.2991 5.27257C13.2906 5.30914 13.2843 5.34742 13.2843 5.38742V6.60685C13.2843 7.07714 13.0317 7.516 12.6231 7.75085C12.2146 7.98571 11.7094 7.98571 11.3009 7.75085L10.2449 7.14114C10.2111 7.12228 10.1746 7.10742 10.1374 7.09714C10.13 7.09428 10.1226 7.09257 10.114 7.09142C10.0774 7.08285 10.0403 7.07828 10.0037 7.07657H9.98771C9.95228 7.07657 9.91857 7.08228 9.88485 7.08971C9.87914 7.08971 9.87285 7.09142 9.86885 7.09257C9.83228 7.10285 9.79857 7.11771 9.76428 7.13542C9.76142 7.13714 9.75685 7.13828 9.75399 7.14L7.64314 8.35942C7.49171 8.44628 7.39914 8.60742 7.39914 8.78228V11.2206C7.39914 11.3954 7.49171 11.5571 7.64314 11.6434L9.75399 12.8629C9.75399 12.8629 9.76142 12.8657 9.76428 12.8674C9.79799 12.8851 9.83171 12.9 9.86885 12.9103C9.87457 12.912 9.88085 12.9131 9.88657 12.9149C9.92028 12.9223 9.95399 12.9269 9.98771 12.928C9.99228 12.928 9.99514 12.9297 9.99971 12.9297H10.0054C10.042 12.9297 10.0791 12.924 10.1157 12.9149C10.1231 12.9131 10.1306 12.9103 10.1391 12.9091C10.1757 12.8989 10.2111 12.884 10.2466 12.8651L11.3026 12.2554C11.7111 12.0206 12.2163 12.0206 12.6243 12.2554C13.0311 12.4903 13.2854 12.9297 13.2854 13.4V14.6194C13.2854 14.6589 13.2911 14.6971 13.3003 14.7337C13.302 14.7411 13.3031 14.7497 13.306 14.7571C13.3163 14.7926 13.3311 14.8274 13.3483 14.86C13.3511 14.8646 13.354 14.8686 13.3574 14.8749C13.3751 14.904 13.3957 14.932 13.4209 14.9571C13.4254 14.9617 13.4283 14.9657 13.4329 14.9703C13.4591 14.9966 13.49 15.0189 13.5226 15.0394C13.5254 15.0411 13.5283 15.044 13.5311 15.0451L15.642 16.2646C15.7169 16.3086 15.802 16.3309 15.886 16.3309C15.97 16.3309 16.0551 16.3086 16.13 16.2646L18.2409 15.0451C18.3923 14.9583 18.4849 14.7971 18.4849 14.6223V12.184C18.4849 12.0091 18.3923 11.8474 18.2409 11.7611L16.13 10.5417C16.13 10.5417 16.1226 10.5389 16.1197 10.5371C16.086 10.5194 16.0523 10.5046 16.0157 10.4943C16.01 10.4931 16.0054 10.4931 15.9997 10.4914C15.966 10.4829 15.9306 10.4783 15.8969 10.4783H15.8809C15.8443 10.4783 15.8077 10.484 15.7706 10.4931C15.7631 10.4949 15.7557 10.4977 15.7489 10.4989C15.7123 10.5091 15.6769 10.524 15.6414 10.5429L14.5854 11.1526C14.1786 11.3874 13.6717 11.3874 13.2637 11.1526C12.8569 10.9177 12.6026 10.4783 12.6026 10.008C12.6026 9.53771 12.8551 9.09885 13.2637 8.86343L13.262 8.85771L13.2603 8.85657Z",
      "M1.75971 8.24743L3.87057 9.46685C3.94542 9.51085 4.03057 9.53314 4.11457 9.53314C4.19857 9.53314 4.28371 9.51085 4.35857 9.46685L6.46942 8.24743C6.46942 8.24743 6.47514 8.24285 6.47799 8.24171C6.51057 8.22285 6.54085 8.19885 6.56771 8.17257C6.57228 8.168 6.57514 8.164 6.57971 8.15942C6.60314 8.13428 6.62371 8.10628 6.64314 8.07714C6.64599 8.07257 6.64885 8.06857 6.65171 8.06228C6.66942 8.02971 6.68428 7.996 6.69457 7.95942C6.69742 7.952 6.69914 7.94457 6.70028 7.936C6.70885 7.89943 6.71514 7.86114 6.71514 7.82171V6.60228C6.71514 6.132 6.96771 5.69314 7.37628 5.45828C7.78485 5.22342 8.28999 5.22342 8.69857 5.45828L9.75457 6.068C9.78828 6.08685 9.82485 6.10171 9.86199 6.112C9.86942 6.11485 9.87685 6.11657 9.88542 6.11771C9.92199 6.12628 9.95742 6.13085 9.99571 6.13257H10.0014C10.006 6.13257 10.0089 6.13085 10.0134 6.13085C10.0471 6.13085 10.0809 6.12514 10.1146 6.11771C10.1203 6.11771 10.1266 6.116 10.1323 6.11314C10.1689 6.10285 10.2026 6.088 10.2369 6.07028C10.2397 6.06914 10.2443 6.06742 10.2471 6.06571L12.358 4.84628C12.5094 4.75942 12.602 4.59828 12.602 4.42342V1.98514C12.602 1.81028 12.5094 1.64857 12.358 1.56228L10.2471 0.342853C10.0957 0.255996 9.90942 0.255996 9.75799 0.342853L7.64714 1.56228C7.64714 1.56228 7.64142 1.56685 7.63857 1.568C7.60657 1.58685 7.57571 1.61085 7.54885 1.63714C7.54428 1.64171 7.54142 1.64571 7.53685 1.65028C7.51342 1.67542 7.49285 1.70342 7.47342 1.73257C7.47057 1.73714 7.46771 1.74114 7.46485 1.74742C7.44714 1.78 7.43228 1.81371 7.42199 1.85028C7.41914 1.85771 7.41742 1.86514 7.41628 1.87371C7.40714 1.91028 7.40142 1.94857 7.40142 1.98857V3.208C7.40142 3.67828 7.14885 4.11714 6.74028 4.35257C6.33342 4.58742 5.82657 4.58742 5.41799 4.35257L4.36199 3.74285C4.32828 3.724 4.29171 3.70914 4.25457 3.69885C4.24714 3.696 4.23971 3.69428 4.23114 3.69314C4.19457 3.68457 4.15742 3.68 4.12085 3.67828H4.10485C4.06942 3.67828 4.03571 3.684 4.00199 3.69142C3.99628 3.69142 3.98999 3.69314 3.98599 3.69428C3.94942 3.70457 3.91571 3.71942 3.88142 3.73714C3.87857 3.73885 3.87399 3.74 3.87114 3.74171L1.76028 4.96114C1.60885 5.048 1.51628 5.20914 1.51628 5.384V7.82228C1.51628 7.99714 1.60885 8.15885 1.76028 8.24514V8.248L1.75971 8.24743Z",
      "M12.3551 15.1514L10.2443 13.932C10.2443 13.932 10.2369 13.9291 10.234 13.9274C10.2003 13.9097 10.1666 13.8954 10.1294 13.8851C10.1237 13.8834 10.1174 13.8823 10.1117 13.8806C10.078 13.8731 10.0443 13.8674 10.0089 13.8674H9.99285C9.95628 13.8674 9.91914 13.8731 9.88257 13.8823C9.87514 13.884 9.86771 13.8869 9.86028 13.888C9.82371 13.8983 9.78828 13.9131 9.75285 13.932L8.69685 14.5417C8.28999 14.7766 7.78314 14.7766 7.37628 14.5417C6.96771 14.3069 6.71514 13.8674 6.71514 13.3971V12.1777C6.71514 12.1383 6.70942 12.1 6.70028 12.0629C6.69914 12.0554 6.69742 12.0469 6.69457 12.0394C6.68428 12.004 6.66942 11.9691 6.65171 11.9366C6.64885 11.932 6.64599 11.928 6.64314 11.9217C6.62542 11.8926 6.60485 11.8646 6.57971 11.8394C6.57514 11.8349 6.57228 11.8309 6.56828 11.8263C6.54199 11.8 6.51114 11.7777 6.47857 11.7571C6.47571 11.7554 6.47285 11.7526 6.46999 11.7514L4.35914 10.532C4.20771 10.4451 4.02142 10.4451 3.86999 10.532L1.75914 11.7514C1.60771 11.8383 1.51514 11.9994 1.51514 12.1743V14.6126C1.51514 14.7874 1.60771 14.9491 1.75914 15.0354L3.86999 16.2549C3.86999 16.2549 3.87742 16.2577 3.88028 16.2594C3.91399 16.2771 3.94771 16.2914 3.98314 16.3017C3.98885 16.3034 3.99514 16.3046 4.00085 16.3063C4.03457 16.3137 4.06714 16.3183 4.10199 16.3194C4.10657 16.3194 4.11057 16.3206 4.11399 16.3206H4.11971C4.15628 16.3206 4.19342 16.3149 4.22828 16.3057C4.23571 16.304 4.24428 16.3011 4.25171 16.3C4.28828 16.2897 4.32371 16.2749 4.35914 16.256L5.41514 15.6463C5.82371 15.4114 6.32885 15.4114 6.73742 15.6463C7.14428 15.8811 7.39857 16.3206 7.39857 16.7909V18.0103C7.39857 18.0497 7.40428 18.088 7.41342 18.1251C7.41514 18.1326 7.41628 18.1411 7.41914 18.1486C7.42942 18.184 7.44428 18.2189 7.46199 18.2514C7.46485 18.256 7.46771 18.26 7.47057 18.2663C7.48828 18.2954 7.50885 18.3234 7.53399 18.3486C7.53857 18.3531 7.54142 18.3571 7.54542 18.3617C7.57171 18.388 7.60257 18.4103 7.63514 18.4309C7.63799 18.4326 7.64085 18.4354 7.64428 18.4366L9.75514 19.656C9.82999 19.7 9.91514 19.7223 9.99914 19.7223C10.0831 19.7223 10.1683 19.7 10.2431 19.656L12.354 18.4366C12.5054 18.3497 12.598 18.1886 12.598 18.0137V15.5754C12.598 15.4006 12.5054 15.2389 12.354 15.1526L12.3551 15.1514Z"
    ]
  },
  cursor: {
    name: 'Cursor',
    bg: '#0b0b0c',
    color: '#ffffff',
    type: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd" style="line-height:1" viewBox="0 0 128 128"><path d="M117.9 30.289 66.664.713a5.32 5.32 0 0 0-5.323 0L10.09 30.29a4.48 4.48 0 0 0-2.234 3.872v59.663c0 1.6.853 3.077 2.24 3.878l51.24 29.586a5.33 5.33 0 0 0 5.324 0l51.246-29.586a4.48 4.48 0 0 0 2.24-3.878V34.166a4.48 4.48 0 0 0-2.24-3.872zm-3.216 6.272-49.47 85.681c-.337.576-1.217.341-1.217-.325V65.81a3.15 3.15 0 0 0-1.573-2.72l-48.59-28.055c-.571-.331-.336-1.216.33-1.216h98.94c1.409 0 2.284 1.525 1.58 2.741"/></svg>'
  },
  nous: {
    name: 'Nous Research',
    bg: '#0b0b0c',
    type: 'img',
    img: 'logos/nous.png'
  },
  pi: {
    name: 'Pi',
    bg: '#09090b',
    color: '#ffffff',
    type: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" rx="120" fill="#09090b"/><path fill="#fff" fill-rule="evenodd" d="M165.29 165.29H517.36V400H400V517.36H282.65V634.72H165.29ZM282.65 282.65V400H400V282.65Z"/><path fill="#fff" d="M517.36 400H634.72V634.72H517.36Z"/></svg>'
  },
  omp: {
    name: 'OMP',
    bg: '#0f0a14',
    type: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="ompg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ed4abf"/><stop offset=".5" stop-color="#9b4dff"/><stop offset="1" stop-color="#5ad8e6"/></linearGradient></defs><rect width="64" height="64" rx="12" fill="#0f0a14"/><path fill="url(#ompg)" d="M14 16h36v8H40v32h-8V24h-6v22h-8V24h-4z"/></svg>'
  },
  t3code: {
    name: 'T3 Code',
    bg: '#000000',
    type: 'img',
    img: 'logos/t3code.png'
  },
  orca: {
    name: 'Orca',
    bg: '#0b0b0c',
    type: 'img',
    img: 'logos/orca.png'
  },
  opencode: {
    name: 'Opencode',
    bg: '#0b0b0c',
    type: 'img',
    img: 'logos/opencode.png'
  },
  commandcode: {
    name: 'Commandcode',
    bg: '#000000',
    type: 'img',
    img: 'logos/commandcode.png'
  },
  antigravity: {
    name: 'Antigravity',
    bg: '#ffffff',
    type: 'img',
    img: 'logos/antigravity.svg'
  },
  cline: {
    name: 'Cline',
    bg: '#ffffff',
    type: 'img',
    img: 'logos/cline.svg'
  },
  codebuddy: {
    name: 'Codebuddy',
    bg: '#ffffff',
    type: 'img',
    img: 'logos/codebuddy.svg'
  },
  workbuddy: {
    name: 'Workbuddy',
    bg: '#6c4dff',
    type: 'img',
    img: 'logos/workbuddy.svg'
  },
  github: {
    name: 'GitHub Copilot',
    bg: '#ffffff',
    type: 'img',
    img: 'logos/github-copilot.svg'
  },
  traecode: {
    name: 'TraeCode',
    bg: '#17191d',
    type: 'img',
    img: 'logos/traecode.png'
  },
  other: {
    name: 'Other',
    bg: '#c6ff3e',
    color: '#0b0b0c',
    type: 'text',
    initial: '?'
  }
};

const DEFAULTS = {
  models: [
    { id: 'm6', name: 'deepseek v4 flash', provider: 'deepseek' },
    { id: 'm14', name: 'deepseek v4 pro', provider: 'deepseek' },
    { id: 'm1', name: 'Fable 5', provider: 'anthropic' },
    { id: 'm16', name: 'Gemini 3.1 Pro', provider: 'google' },
    { id: 'm20', name: 'Gemini 3.6 Flash', provider: 'google' },
    { id: 'm15', name: 'Gemini 3.7 Flash', provider: 'google' },
    { id: 'm11', name: 'glm-5.2', provider: 'zhipu' },
    { id: 'm8', name: 'glm-5.3', provider: 'zhipu' },
    { id: 'm21', name: 'gpt-5.5', provider: 'openai' },
    { id: 'm7', name: 'gpt-5.6-luna', provider: 'openai' },
    { id: 'm2', name: 'gpt-5.6-sol', provider: 'openai' },
    { id: 'm12', name: 'gpt-5.6-terra', provider: 'openai' },
    { id: 'm3', name: 'Grok 4.5', provider: 'grok' },
    { id: 'm5', name: 'Grok 4.6', provider: 'grok' },
    { id: 'm4', name: 'kimi k3', provider: 'kimi' },
    { id: 'm19', name: 'Muse Spark 1.2', provider: 'meta' },
    { id: 'm22', name: 'Opus 4.8', provider: 'anthropic' },
    { id: 'm9', name: 'Opus 5', provider: 'anthropic' },
    { id: 'm23', name: 'Ox Alpha', provider: 'other' },
    { id: 'm17', name: 'Qwen-3.8-max', provider: 'qwen' },
    { id: 'm13', name: 'Sonnet 5', provider: 'anthropic' }
  ],
  harnesses: [
    { id: 'h17', name: 'Antigravity', provider: 'antigravity' },
    { id: 'h2', name: 'Claude Code', provider: 'anthropic' },
    { id: 'h18', name: 'Cline', provider: 'cline' },
    { id: 'h19', name: 'Codebuddy', provider: 'codebuddy' },
    { id: 'h3', name: 'Codex', provider: 'openai' },
    { id: 'h16', name: 'Commandcode', provider: 'commandcode' },
    { id: 'h9', name: 'Cursor', provider: 'cursor' },
    { id: 'h5', name: 'Deepseek Agent', provider: 'deepseek' },
    { id: 'h20', name: 'GitHub Copilot', provider: 'github' },
    { id: 'h8', name: 'Grok Build', provider: 'grok' },
    { id: 'h10', name: 'Hermes Agent', provider: 'nous' },
    { id: 'h6', name: 'Kimi Code', provider: 'kimi' },
    { id: 'h15', name: 'Opencode', provider: 'opencode' },
    { id: 'h11', name: 'Pi', provider: 'pi' },
    { id: 'h7', name: 'Qwen Code', provider: 'qwen' },
    { id: 'h13', name: 'T3code', provider: 't3code' },
    { id: 'h22', name: 'TraeCode', provider: 'traecode' },
    { id: 'h21', name: 'Workbuddy', provider: 'workbuddy' },
    { id: 'h4', name: 'Zcode', provider: 'zhipu' }
  ]
};

const MODE_PROVIDERS = {
  models: ['openai', 'anthropic', 'xai', 'grok', 'deepseek', 'google', 'kimi', 'qwen', 'zhipu', 'meta', 'cognition', 'cursor', 'other'],
  harnesses: ['antigravity', 'anthropic', 'cline', 'codebuddy', 'openai', 'commandcode', 'cursor', 'deepseek', 'github', 'grok', 'nous', 'kimi', 'opencode', 'pi', 'qwen', 't3code', 'traecode', 'workbuddy', 'zhipu', 'other']
};

const COPY = {
  zh: {
    subtitle: '将卡片拖入对应档位，然后把你的榜单导出为 PNG。',
    namePlaceholder: '你的名字',
    reset: '重置',
    download: '下载 PNG',
    copy: '复制 PNG',
    add: '添加',
    author: '作者',
    screenshotLoading: '截图组件仍在加载，请稍后再试。',
    downloaded: 'PNG 已下载。',
    rendering: '正在生成 PNG…',
    copied: '已复制到剪贴板，可以粘贴到任意位置。',
    clipboardFallback: '无法访问剪贴板，已改为下载 PNG。',
    resetDone: '所有卡片已回到待排名区域。',
    removed: name => `“${name}”已移除。`,
    exportFailed: message => `导出失败：${message}`,
    modes: {
      models: {
        boardTitle: 'AI 模型榜单', poolTitle: 'Models', addPlaceholder: '添加新模型…',
        removeTitle: '移除这个模型', dragHint: '将模型卡片拖入档位 • ',
        file: 'my-ai-rank-models-zh.png', shareTitle: '我的 AI 模型榜单',
        shareBy: ' — 使用 My AI Rank 制作', addedMsg: '新模型已添加到下方待排名区域。'
      },
      harnesses: {
        boardTitle: 'AI Agent榜单', poolTitle: 'Agent', addPlaceholder: '添加新工具…',
        removeTitle: '移除这个工具', dragHint: '将工具卡片拖入档位 • ',
        file: 'my-ai-rank-agents-zh.png', shareTitle: '我的 AI Agent榜单',
        shareBy: ' — 使用 My AI Rank 制作', addedMsg: '新工具已添加到下方待排名区域。'
      }
    },
    footNote: '使用 airank.dinosaurliu.com 制作'
  },
  en: {
    subtitle: 'Drag the cards into tiers, then export your ranking as a PNG.',
    namePlaceholder: 'Your name',
    reset: 'Reset',
    download: 'Download PNG',
    copy: 'Copy PNG',
    add: 'Add',
    author: 'by',
    screenshotLoading: 'Screenshot library is still loading — please try again in a second.',
    downloaded: 'Your PNG has been downloaded.',
    rendering: 'Rendering your PNG…',
    copied: 'Copied to clipboard — you can paste it anywhere.',
    clipboardFallback: 'Clipboard access was blocked, so the PNG was downloaded instead.',
    resetDone: 'All cards are back in the pool.',
    removed: name => `"${name}" has been removed.`,
    exportFailed: message => `Export failed: ${message}`,
    modes: {
      models: {
        boardTitle: 'AI Model Rank', poolTitle: 'Models', addPlaceholder: 'Add a new model…',
        removeTitle: 'Remove this model', dragHint: 'Drag a model card into a tier • ',
        file: 'my-ai-rank-models.png', shareTitle: 'My AI model rank',
        shareBy: ' — created with My AI Rank', addedMsg: 'New model added to the pool below.'
      },
      harnesses: {
        boardTitle: 'AI Agent Rank', poolTitle: 'Agent', addPlaceholder: 'Add a new agent…',
        removeTitle: 'Remove this agent', dragHint: 'Drag an agent card into a tier • ',
        file: 'my-ai-rank-agents.png', shareTitle: 'My AI Agent Rank',
        shareBy: ' — created with My AI Rank', addedMsg: 'New agent added to the pool below.'
      }
    },
    footNote: 'made with airank.dinosaurliu.com'
  }
};

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function stringToColor(str) {
  const palette = ['#c6ff3e','#4fc3f7','#f2a25b','#66c46a','#a866e0','#e055aa','#ff5b6b','#f2c45b'];
  return palette[hashCode(str) % palette.length];
}

function iconFor(key, label) {
  const p = PROVIDERS[key] || PROVIDERS.other;
  if (p.type === 'img') {
    return `<span class="provider-icon" style="background:${p.bg}" aria-label="${escapeHtml(p.name)}"><img src="${escapeHtml(p.img)}" alt="" loading="lazy"></span>`;
  }
  if (p.type === 'svg') {
    if (p.svg) {
      return `<span class="provider-icon" style="background:${p.bg};color:${p.color}" aria-label="${escapeHtml(p.name)}">${p.svg}</span>`;
    }
    const vb = p.viewBox || '0 0 24 24';
    const paths = Array.isArray(p.paths)
      ? p.paths.map(d => `<path d="${escapeHtml(d)}"/>`).join('')
      : `<path d="${escapeHtml(p.path)}"/>`;
    return `<span class="provider-icon" style="background:${p.bg};color:${p.color}" aria-label="${escapeHtml(p.name)}">
      <svg viewBox="${vb}" fill="${p.color}">${paths}</svg>
    </span>`;
  }
  const initial = escapeHtml((p.initial || label?.[0] || '?').toUpperCase());
  const bg = p.bg === 'hash' ? stringToColor(label || key) : p.bg;
  return `<span class="provider-icon" style="background:${bg};color:${p.color}">${initial}</span>`;
}

const state = {
  models: DEFAULTS.models.map((m, i) => ({ ...m, tier: 'pool', sort: i })),
  harnesses: DEFAULTS.harnesses.map((m, i) => ({ ...m, tier: 'pool', sort: i }))
};
const initialParams = new URLSearchParams(location.search);
let mode = initialParams.get('mode') === 'harnesses' ? 'harnesses' : 'models';
const urlLanguage = initialParams.get('lang');
let language = urlLanguage === 'en' || urlLanguage === 'zh'
  ? urlLanguage
  : (localStorage.getItem('ai-rank-language') === 'en' ? 'en' : 'zh');
function items() { return state[mode]; }
function modeCopy() { return COPY[language].modes[mode]; }
function visibleTiers() {
  return language === 'zh'
    ? ZH_TIERS
    : EN_TIER_ORDER.map(tier => ({ key: tier, label: tier, source: [tier] }));
}
let dragId = null;

const tierRowsEl = document.getElementById('tier-rows');
const poolListEl = document.getElementById('pool-list');
const poolCountEl = document.getElementById('pool-count');
const boardAuthorEl = document.getElementById('board-author');
const nameInput = document.getElementById('name');
const handleInput = document.getElementById('handle');
const statusEl = document.getElementById('status');

function readHandle() {
  let h = handleInput.value.trim();
  if (h && !h.startsWith('@')) h = '@' + h;
  return h;
}

function updateAuthor() {
  const name = nameInput.value.trim();
  const handle = readHandle();
  let text = '';
  const prefix = COPY[language].author;
  if (name && handle) text = language === 'zh' ? `${prefix}：${name}（${handle}）` : `${prefix} ${name} (${handle})`;
  else if (name) text = language === 'zh' ? `${prefix}：${name}` : `${prefix} ${name}`;
  else if (handle) text = language === 'zh' ? `${prefix}：${handle}` : `${prefix} ${handle}`;
  boardAuthorEl.textContent = text;
}

function cardHtml(m) {
  const removeTitle = modeCopy().removeTitle;
  return `<div class="model-card" draggable="true" data-id="${escapeHtml(m.id)}">
    ${iconFor(m.provider, m.name)}
    <span class="model-name">${escapeHtml(m.name)}</span>
    <span class="drag-handle">⋮⋮</span>
    <button class="card-del screen-only" type="button" title="${removeTitle}" aria-label="${removeTitle} ${escapeHtml(m.name)}">×</button>
  </div>`;
}

function render() {
  tierRowsEl.innerHTML = '';
  for (const tier of visibleTiers()) {
    const lane = document.createElement('div');
    lane.className = 'tier-row';
    lane.innerHTML = `<div class="tier-label" data-tier="${escapeHtml(tier.key)}">${escapeHtml(tier.label)}</div>
                      <div class="tier-lane" data-tier="${escapeHtml(tier.key)}"></div>`;
    const laneInner = lane.querySelector('.tier-lane');
    const tierModels = items().filter(m => tier.source.includes(m.tier)).sort((a,b) => a.sort - b.sort);
    for (const m of tierModels) {
      const card = document.createElement('div');
      card.innerHTML = cardHtml(m);
      const el = card.firstElementChild;
      bindCard(el, m);
      laneInner.appendChild(el);
    }
    bindLane(laneInner);
    tierRowsEl.appendChild(lane);
  }
  poolListEl.innerHTML = '';
  const poolModels = items().filter(m => m.tier === 'pool').sort((a,b) => a.sort - b.sort);
  for (const m of poolModels) {
    const card = document.createElement('div');
    card.innerHTML = cardHtml(m);
    const el = card.firstElementChild;
    bindCard(el, m);
    poolListEl.appendChild(el);
  }
  bindLane(poolListEl);
  poolCountEl.textContent = poolModels.length;
}

function bindCard(el, m) {
  const del = el.querySelector('.card-del');
  if (del) {
    del.addEventListener('dragstart', e => e.preventDefault());
    del.addEventListener('click', e => {
      e.stopPropagation();
      state[mode] = items().filter(x => x.id !== m.id);
      render();
      setStatus(COPY[language].removed(m.name), 'info');
    });
  }
  el.addEventListener('dragstart', e => {
    dragId = m.id;
    e.dataTransfer.setData('text/plain', m.id);
    e.dataTransfer.effectAllowed = 'move';
    // Use a clean off-screen clone as the drag preview. Without this the
    // browser snapshots the card together with its stacking context
    // (translucent backgrounds included), which shows up as a large ghost.
    const ghost = el.cloneNode(true);
    ghost.style.position = 'fixed';
    ghost.style.top = '-1000px';
    ghost.style.left = '-1000px';
    ghost.style.margin = '0';
    ghost.style.pointerEvents = 'none';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, ghost.offsetHeight / 2);
    el._ghost = ghost;
    // Defer the class change so the drag snapshot is taken before dimming.
    requestAnimationFrame(() => el.classList.add('dragging'));
  });
  el.addEventListener('dragend', () => {
    dragId = null;
    el.classList.remove('dragging');
    if (el._ghost) { el._ghost.remove(); el._ghost = null; }
    document.querySelectorAll('.drag-over').forEach(x => x.classList.remove('drag-over'));
  });
}

function bindLane(zone) {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    const m = items().find(x => x.id === id);
    if (!m) return;
    m.tier = zone.dataset.tier || 'pool';
    // Append moved entry to end of its tier for stable order
    const maxSort = Math.max(0, ...items().filter(x => x.tier === m.tier && x.id !== id).map(x => x.sort), -1);
    m.sort = maxSort + 1;
    render();
  });
}

function setStatus(msg, kind='info') {
  statusEl.textContent = msg;
  statusEl.style.color = kind === 'error' ? '#ff5b6b' : (kind === 'success' ? '#c6ff3e' : 'var(--accent)');
  setTimeout(() => { if (statusEl.textContent === msg) statusEl.textContent = ''; }, 5000);
}

function buildShareText() {
  const name = nameInput.value.trim();
  const handle = readHandle();
  const cfg = modeCopy();
  let text = cfg.shareTitle;
  if (name) text += language === 'zh' ? `，作者：${name}` : ` by ${name}`;
  if (handle && handle !== name) text += ` (${handle})`;
  text += cfg.shareBy;
  return text;
}

async function exportPNG(download = false) {
  if (typeof html2canvas === 'undefined') {
    setStatus(COPY[language].screenshotLoading, 'error');
    return;
  }
  updateAuthor();
  const board = document.getElementById('tier-board');
  try {
    const canvas = await html2canvas(board, {
      backgroundColor: '#0b0b0c',
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (doc) => {
        const clone = doc.getElementById('tier-board');
        if (!clone) return;
        clone.querySelectorAll('.screen-only').forEach(el => el.style.display = 'none');
        clone.querySelectorAll('.png-only').forEach(el => el.style.display = 'inline-flex');
      }
    });
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (download) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = modeCopy().file;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(COPY[language].downloaded, 'success');
    }
    return blob;
  } catch (err) {
    console.error(err);
    setStatus(COPY[language].exportFailed(err.message), 'error');
  }
}

// Plain clipboard copy — no X involved. Same resolved-blob discipline as shareOnX:
// render first, write while the tab is focused and the click's activation lasts.
async function copyToClipboard() {
  setStatus(COPY[language].rendering);
  const blob = await exportPNG(false);
  if (!blob) return;
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setStatus(COPY[language].copied, 'success');
      return;
    } catch (err) {
      console.error(err);
    }
  }
  downloadBlob(blob);
  setStatus(COPY[language].clipboardFallback, 'info');
}

// The native share sheet only earns its keep on mobile, where the X app is a
// share target and receives the image directly. Desktop macOS supports
// navigator.share too, but without the X app installed the sheet is a dead end
// (Mail/Notes/…) — desktop goes straight to clipboard + composer.
function isMobileShareContext() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS
}

function canShareFiles() {
  if (!isMobileShareContext()) return false;
  if (!navigator.canShare || !navigator.share) return false;
  try {
    const probe = new File([new Blob([''], { type: 'image/png' })], 'probe.png', { type: 'image/png' });
    return navigator.canShare({ files: [probe] });
  } catch (err) {
    return false;
  }
}

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = modeCopy().file;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Render the PNG and land it on the clipboard BEFORE opening the X tab:
// once the new tab takes focus, a pending clipboard write is rejected with
// "Document is not focused" and the image never arrives. Copy first, open second.
async function shareOnX() {
  const text = buildShareText();
  const intentUrl = 'https://x.com/intent/post?text=' + encodeURIComponent(text);
  setStatus('Rendering PNG…');
  const blob = await exportPNG(false);
  if (!blob) return;

  if (canShareFiles()) {
    const file = new File([blob], modeCopy().file, { type: 'image/png' });
    try {
      await navigator.share({ files: [file], title: modeCopy().shareTitle, text });
      setStatus(language === 'zh' ? '分享菜单已打开，请选择 X 发布图片。' : 'Share sheet opened. Pick X to post with the image.', 'success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error(err);
      copyThenCompose(blob, intentUrl);
    }
    return;
  }

  copyThenCompose(blob, intentUrl);
}

// X's web composer cannot receive a file through the intent URL, but it does
// accept a pasted image. The blob is already resolved and our tab still has
// focus, so the clipboard write lands immediately inside the click's transient
// activation. The composer opens right after — one Cmd/Ctrl+V attaches the image.
async function copyThenCompose(blob, intentUrl) {
  let copied = false;
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      copied = true;
    } catch (err) {
      console.error(err);
    }
  }

  const win = window.open(intentUrl, '_blank', 'noopener');

  if (!win) {
    // Popup blocked (transient activation expired) — offer a manual way in.
    statusEl.innerHTML = (copied ? 'Image copied. ' : 'PNG downloaded. ') +
      `<a href="${intentUrl}" target="_blank" rel="noopener">Open the X composer ↗</a> and press ⌘V / Ctrl+V to attach it.`;
    if (!copied) downloadBlob(blob);
    return;
  }

  if (copied) {
    setStatus('Image copied — opening X…', 'success');
  } else {
    downloadBlob(blob);
    setStatus('Clipboard blocked — PNG downloaded instead. Attach it in the X composer.', 'info');
  }
}

function populateProviderSelect() {
  const sel = document.getElementById('new-provider');
  const keys = MODE_PROVIDERS[mode];
  sel.innerHTML = Object.entries(PROVIDERS)
    .filter(([k]) => keys.includes(k))
    .sort((a,b) => (a[1].name === 'Other' ? 1 : b[1].name === 'Other' ? -1 : a[1].name.localeCompare(b[1].name)))
    .map(([k,p]) => `<option value="${escapeHtml(k)}">${escapeHtml(p.name)}</option>`)
    .join('');
  sel.value = 'other';
}

// Keep mode and language in the URL so either version can be shared directly.
function syncUrl() {
  const params = new URLSearchParams();
  if (mode === 'harnesses') params.set('mode', mode);
  params.set('lang', language);
  const query = params.toString();
  history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}`);
}

function setMode(next) {
  if (!MODE_PROVIDERS[next] || next === mode) return;
  mode = next;
  applyUi();
  syncUrl();
}

function setLanguage(next) {
  if (!COPY[next] || next === language) return;
  language = next;
  localStorage.setItem('ai-rank-language', language);
  applyUi();
  syncUrl();
}

function applyUi() {
  const text = COPY[language];
  const cfg = modeCopy();
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('.mode-tab').forEach(t => {
    const on = t.dataset.mode === mode;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', String(on));
  });
  document.querySelectorAll('.language-tab').forEach(t => {
    const on = t.dataset.lang === language;
    t.classList.toggle('active', on);
    t.setAttribute('aria-pressed', String(on));
  });
  document.title = `My AI Rank — ${mode === 'models' ? 'Models' : 'Agent'}`;
  document.querySelector('meta[name="description"]').content = text.subtitle;
  document.getElementById('page-subtitle').textContent = text.subtitle;
  nameInput.placeholder = text.namePlaceholder;
  document.getElementById('btn-reset').textContent = text.reset;
  document.getElementById('btn-export').textContent = text.download;
  document.getElementById('btn-copy').textContent = text.copy;
  document.getElementById('btn-add').textContent = text.add;
  document.getElementById('board-title').textContent = cfg.boardTitle;
  document.getElementById('board-meta-drag').textContent = cfg.dragHint;
  document.getElementById('board-brand').textContent = 'My AI Rank';
  document.getElementById('board-brand-png').textContent = 'My AI Rank';
  document.getElementById('board-foot-note-text').textContent = text.footNote;
  document.getElementById('pool-title').textContent = cfg.poolTitle;
  document.getElementById('new-model').placeholder = cfg.addPlaceholder;
  statusEl.textContent = '';
  populateProviderSelect();
  updateAuthor();
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mode-tab').forEach(t =>
    t.addEventListener('click', () => setMode(t.dataset.mode)));
  document.querySelectorAll('.language-tab').forEach(t =>
    t.addEventListener('click', () => setLanguage(t.dataset.lang)));
  applyUi();
  syncUrl();
  nameInput.addEventListener('input', updateAuthor);
  handleInput.addEventListener('input', updateAuthor);

  document.getElementById('btn-export').addEventListener('click', () => exportPNG(true));
  document.getElementById('btn-copy').addEventListener('click', copyToClipboard);
  document.getElementById('btn-reset').addEventListener('click', () => {
    items().forEach(m => m.tier = 'pool');
    render();
    setStatus(COPY[language].resetDone, 'info');
  });

  document.getElementById('add-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('new-model');
    const sel = document.getElementById('new-provider');
    const name = input.value.trim();
    if (!name) return;
    const key = sel.value || 'other';
    const id = 'c-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,5);
    items().push({ id, name, provider: key, tier: 'pool', sort: items().length, custom: true });
    input.value = '';
    render();
    setStatus(modeCopy().addedMsg, 'success');
  });
});
