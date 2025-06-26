
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentConfig } from '@/pages/Editor';
import { 
  Download, 
  Copy, 
  Check, 
  Crown, 
  Code, 
  Image as ImageIcon,
  FileText,
  Github,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: ComponentConfig[];
  tier: 'free' | 'pro';
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  components,
  tier,
  canvasRef
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('png');

  const generateHTMLCode = () => {
    const htmlParts = components.map(component => {
      switch (component.type) {
        case 'hero':
          return `
<!-- Hero Section -->
<section class="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-16 px-8 rounded-lg">
  <h1 class="text-5xl font-bold mb-4">${component.props.headline}</h1>
  <p class="text-lg mb-6">${component.props.subheadline}</p>
  <button class="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
    ${component.props.primaryCTA}
  </button>
</section>
${tier === 'free' ? '<!-- Upgrade to Pro for full code export → https://componentforge.com/pro -->' : ''}`;
        
        case 'feature':
          return `
<!-- Feature Card -->
<div class="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  </div>
  <h3 class="text-xl font-semibold mb-2">${component.props.headline}</h3>
  <p class="text-slate-300">${component.props.description}</p>
</div>`;

        case 'button':
          return `
<!-- Button Component -->
<button class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
  ${component.props.text}
</button>`;

        case 'testimonial':
          return `
<!-- Testimonial -->
<div class="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
  <div class="text-purple-400 mb-4">
    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.251.409-.476.559-.68.114-.308.292-.575.469-.844.148-.251.409-.476.559-.68.114-.308.292-.575.469-.844.148-.251.409-.476.559-.68.146-.204.4-.403.559-.68.114-.308.292-.575.469-.844.148-.251.409-.476.559-.68.114-.308.292-.575.469-.844.148-.251.409-.476.559-.68.146-.204.4-.403.559-.68.114-.308.292-.575.469-.844l.16-.275c.129-.219.158-.288.069-.436-.127-.216-.311-.35-.482-.484-.24-.203-.444-.389-.601-.604-.077-.096-.165-.223-.247-.335-.128-.176-.24-.362-.36-.529-.12-.168-.245-.329-.376-.479-.13-.15-.268-.286-.407-.424-.139-.137-.281-.269-.426-.395-.145-.126-.294-.246-.448-.359-.154-.113-.315-.217-.477-.317-.162-.1-.328-.193-.495-.282-.167-.09-.337-.174-.508-.253-.171-.079-.344-.152-.518-.219-.174-.067-.35-.129-.527-.185-.177-.056-.356-.107-.535-.152-.179-.045-.359-.084-.54-.118-.181-.034-.363-.062-.545-.085-.182-.023-.365-.041-.548-.054-.183-.013-.367-.02-.551-.022-.184-.002-.368.001-.552.008-.184.007-.368.019-.552.035-.184.016-.368.037-.552.062-.184.025-.368.055-.552.089-.184.034-.368.073-.552.116-.184.043-.368.091-.552.143-.184.052-.368.109-.552.17-.184.061-.368.127-.552.197-.184.07-.368.145-.552.224-.184.079-.368.163-.552.251-.184.088-.368.181-.552.278-.184.097-.368.199-.552.305-.184.106-.368.217-.552.332-.184.115-.368.235-.552.359-.184.124-.368.253-.552.386-.184.133-.368.271-.552.413-.184.142-.368.289-.552.44-.184.151-.368.307-.552.467-.184.16-.368.325-.552.494-.184.169-.368.343-.552.521-.184.178-.368.361-.552.548-.184.187-.368.379-.552.575-.184.196-.368.397-.552.602-.184.205-.368.415-.552.629-.184.214-.368.433-.552.656-.184.223-.368.451-.552.683-.184.232-.368.469-.552.71-.184.241-.368.487-.552.737-.184.25-.368.505-.552.764-.184.259-.368.523-.552.791-.184.268-.368.541-.552.818-.184.277-.368.559-.552.845-.184.286-.368.577-.552.872-.184.295-.368.595-.552.899-.184.304-.368.613-.552.926-.184.313-.368.631-.552.953-.184.322-.368.649-.552.98-.184.331-.368.667-.552 1.007-.184.34-.368.685-.552 1.034-.184.349-.368.703-.552 1.061-.184.358-.368.721-.552 1.088-.184.367-.368.739-.552 1.115-.184.376-.368.757-.552 1.142-.184.385-.368.775-.552 1.169-.184.394-.368.793-.552 1.196-.184.403-.368.811-.552 1.223-.184.412-.368.829-.552 1.25-.184.421-.368.847-.552 1.277-.184.43-.368.865-.552 1.304-.184.439-.368.883-.552 1.331-.184.448-.368.901-.552 1.358-.184.457-.368.919-.552 1.385-.184.466-.368.937-.552 1.412-.184.475-.368.955-.552 1.439-.184.484-.368.973-.552 1.466-.184.493-.368.991-.552 1.493-.184.502-.368 1.009-.552 1.52-.184.511-.368 1.027-.552 1.547-.184.52-.368 1.045-.552 1.574-.184.529-.368 1.063-.552 1.601-.184.538-.368 1.081-.552 1.628-.184.547-.368 1.099-.552 1.655-.184.556-.368 1.117-.552 1.682-.184.565-.368 1.135-.552 1.709-.184.574-.368 1.153-.552 1.736-.184.583-.368 1.171-.552 1.763-.184.592-.368 1.189-.552 1.79-.184.601-.368 1.207-.552 1.817-.184.61-.368 1.225-.552 1.844-.184.619-.368 1.243-.552 1.871-.184.628-.368 1.261-.552 1.898-.184.637-.368 1.279-.552 1.925-.184.646-.368 1.297-.552 1.952-.184.655-.368 1.315-.552 1.979-.184.664-.368 1.333-.552 2.006-.184.673-.368 1.351-.552 2.033-.184.682-.368 1.369-.552 2.06-.184.691-.368 1.387-.552 2.087-.184.7-.368 1.405-.552 2.114-.184.709-.368 1.423-.552 2.141-.184.718-.368 1.441-.552 2.168-.184.727-.368 1.459-.552 2.195-.184.736-.368 1.477-.552 2.222-.184.745-.368 1.495-.552 2.249-.184.754-.368 1.513-.552 2.276-.184.763-.368 1.531-.552 2.303-.184.772-.368 1.549-.552 2.33-.184.781-.368 1.567-.552 2.357-.184.79-.368 1.585-.552 2.384-.184.799-.368 1.603-.552 2.411-.184.808-.368 1.621-.552 2.438-.184.817-.368 1.639-.552 2.465-.184.826-.368 1.657-.552 2.492-.184.835-.368 1.675-.552 2.519-.184.844-.368 1.693-.552 2.546-.184.853-.368 1.711-.552 2.573-.184.862-.368 1.729-.552 2.6-.184.871-.368 1.747-.552 2.627-.184.88-.368 1.765-.552 2.654-.184.889-.368 1.783-.552 2.681-.184.898-.368 1.801-.552 2.708-.184.907-.368 1.819-.552 2.735-.184.916-.368 1.837-.552 2.762-.184.925-.368 1.855-.552 2.789-.184.934-.368 1.873-.552 2.816-.184.943-.368 1.891-.552 2.843-.184.952-.368 1.909-.552 2.87-.184.961-.368 1.927-.552 2.997-.184 1.07-.368 2.045-.552 3.024-.184.979-.368 1.963-.552 2.951-.184.988-.368 1.981-.552 2.978-.184.997-.368 2.019-.552 3.045-.184 1.026-.368 2.057-.552 3.092-.184 1.035-.368 2.079-.552 3.127-.184 1.048-.368 2.101-.552 3.158-.184 1.057-.368 2.119-.552 3.185-.184 1.066-.368 2.137-.552 3.212-.184 1.075-.368 2.158-.552 3.245-.184 1.087-.368 2.180-.552 3.277-.184 1.097-.368 2.219-.552 3.345-.184 1.126-.368 2.237-.552 3.352-.184 1.115-.368 2.234-.552 3.357-.184 1.123-.368 2.250-.552 3.381-.184 1.131-.368 2.266-.552 3.405-.184 1.139-.368 2.282-.552 3.429-.184 1.147-.368 2.298-.552 3.453-.184 1.155-.368 2.314-.552 3.479-.184 1.165-.368 2.334-.552 3.507-.184 1.173-.368 2.350-.552 3.531-.184 1.181-.368 2.366-.552 3.555-.184 1.189-.368 2.382-.552 3.579-.184 1.197-.368 2.398-.552 3.603-.184 1.205-.368 2.414-.552 3.629-.184 1.215-.368 2.430-.552 3.649-.184 1.219-.368 2.446-.552 3.677-.184 1.231-.368 2.460-.552 3.693-.184 1.233-.368 2.470-.552 3.711-.184 1.241-.368 2.484-.552 3.721-.184 1.237-.368 2.478-.552 3.723-.184 1.245-.368 2.494-.552 3.747-.184 1.253-.368 2.510-.552 3.771-.184 1.261-.368 2.526-.552 3.795-.184 1.269-.368 2.542-.552 3.819-.184 1.277-.368 2.558-.552 3.843-.184 1.285-.368 2.574-.552 3.867-.184 1.293-.368 2.590-.552 3.911-.184 1.321-.368 2.606-.552 3.895-.184 1.289-.368 2.582-.552 3.879-.184 1.297-.368 2.598-.552 3.903-.184 1.305-.368 2.614-.552 3.929-.184 1.315-.368 2.630-.552 3.949-.184 1.319-.368 2.642-.552 3.969-.184 1.327-.368 2.658-.552 3.993-.184 1.335-.368 2.674-.552 4.017-.184 1.343-.368 2.690-.552 4.041-.184 1.351-.368 2.706-.552 4.065-.184 1.359-.368 2.722-.552 4.089-.184 1.367-.368 2.738-.552 4.113-.184 1.375-.368 2.754-.552 4.139-.184 1.385-.368 2.770-.552 4.159-.184 1.389-.368 2.782-.552 4.179-.184 1.397-.368 2.798-.552 4.203-.184 1.405-.368 2.814-.552 4.229-.184 1.415-.368 2.830-.552 4.249-.184 1.419-.368 2.842-.552 4.269-.184 1.427-.368 2.858-.552 4.293-.184 1.435-.368 2.874-.552 4.319-.184 1.445-.368 2.890-.552 4.339-.184 1.449-.368 2.902-.552 4.359-.184 1.457-.368 2.918-.552 4.383-.184 1.465-.368 2.934-.552 4.409-.184 1.475-.368 2.950-.552 4.429-.184 1.479-.368 2.962-.552 4.449-.184 1.487-.368 2.978-.552 4.473-.184 1.495-.368 2.994-.552 4.517-.184 1.523-.368 3.010-.552 4.501-.184 1.491-.368 2.986-.552 4.485-.184 1.499-.368 3.002-.552 4.519-.184 1.517-.368 3.036-.552 4.559-.184 1.523-.368 3.054-.552 4.589-.184 1.535-.368 3.070-.552 4.609-.184 1.539-.368 3.082-.552 4.629-.184 1.547-.368 3.098-.552 4.653-.184 1.555-.368 3.114-.552 4.679-.184 1.565-.368 3.130-.552 4.699-.184 1.569-.368 3.142-.552 4.719-.184 1.577-.368 3.158-.552 4.743-.184 1.585-.368 3.174-.552 4.767-.184 1.593-.368 3.190-.552 4.817-.184 1.627-.368 3.206-.552 4.799-.184 1.593-.368 3.186-.552 4.783-.184 1.597-.368 3.198-.552 4.803-.184 1.605-.368 3.214-.552 4.827-.184 1.613-.368 3.226-.552 4.843-.184 1.617-.368 3.234-.552 4.855-.184 1.621-.368 3.242-.552 4.867-.184 1.625-.368 3.250-.552 4.879-.184 1.629-.368 3.258-.552 4.891-.184 1.633-.368 3.266-.552 4.903-.184 1.637-.368 3.274-.552 4.915-.184 1.641-.368 3.282-.552 4.927-.184 1.645-.368 3.290-.552 4.939-.184 1.649-.368 3.298-.552 4.951-.184 1.653-.368 3.306-.552 4.963-.184 1.657-.368 3.314-.552 4.975-.184 1.661-.368 3.322-.552 4.987-.184 1.665-.368 3.330-.552 4.999-.184 1.669-.368 3.338-.552 5.011-.184 1.673-.368 3.346-.552 5.023-.184 1.677-.368 3.354-.552 5.035-.184 1.681-.368 3.362-.552 5.047-.184 1.685-.368 3.370-.552 5.059-.184 1.689-.368 3.378-.552 5.071-.184 1.693-.368 3.386-.552 5.083-.184 1.697-.368 3.394-.552 5.095-.184 1.701-.368 3.402-.552 5.107-.184 1.705-.368 3.410-.552 5.119-.184 1.709-.368 3.418-.552 5.131-.184 1.713-.368 3.426-.552 5.143-.184 1.717-.368 3.434-.552 5.155-.184 1.721-.368 3.442-.552 5.167-.184 1.725-.368 3.450-.552 5.179-.184 1.729-.368 3.458-.552 5.191-.184 1.733-.368 3.466-.552 5.203-.184 1.737-.368 3.474-.552 5.215-.184 1.741-.368 3.482-.552 5.227-.184 1.745-.368 3.490-.552 5.239-.184 1.749-.368 3.498-.552 5.251-.184 1.753-.368 3.506-.552 5.263-.184 1.757-.368 3.514-.552 5.275-.184 1.761-.368 3.522-.552 5.287-.184 1.765-.368 3.530-.552 5.299-.184 1.769-.368 3.538-.552 5.311-.184 1.773-.368 3.546-.552 5.323-.184 1.777-.368 3.554-.552 5.335-.184 1.781-.368 3.562-.552 5.347-.184 1.785-.368 3.570-.552 5.359-.184 1.789-.368 3.578-.552 5.371-.184 1.793-.368 3.586-.552 5.383-.184 1.797-.368 3.594-.552 5.395-.184 1.801-.368 3.602-.552 5.407-.184 1.805-.368 3.610-.552 5.419-.184 1.809-.368 3.618-.552 5.431-.184 1.813-.368 3.626-.552 5.443-.184 1.817-.368 3.634-.552 5.455-.184 1.821-.368 3.642-.552 5.467-.184 1.825-.368 3.650-.552 5.479-.184 1.829-.368 3.658-.552 5.491-.184 1.833-.368 3.666-.552 5.503-.184 1.837-.368 3.674-.552 5.515-.184 1.841-.368 3.682-.552 5.527-.184 1.845-.368 3.690-.552 5.539-.184 1.849-.368 3.698-.552 5.551-.184 1.853-.368 3.706-.552 5.563-.184 1.857-.368 3.714-.552 5.575-.184 1.861-.368 3.722-.552 5.587-.184 1.865-.368 3.730-.552 5.599-.184 1.869-.368 3.738-.552 5.611-.184 1.873-.368 3.746-.552 5.623-.184 1.877-.368 3.754-.552 5.635-.184 1.881-.368 3.762-.552 5.647-.184 1.885-.368 3.770-.552 5.659-.184 1.889-.368 3.778-.552 5.671-.184 1.893-.368 3.786-.552 5.683-.184 1.897-.368 3.794-.552 5.695-.184 1.901-.368 3.802-.552 5.707-.184 1.905-.368 3.810-.552 5.719-.184 1.909-.368 3.818-.552 5.731-.184 1.913-.368 3.826-.552 5.743-.184 1.917-.368 3.834-.552 5.755-.184 1.921-.368 3.842-.552 5.767-.184 1.925-.368 3.850-.552 5.779-.184 1.929-.368 3.858-.552 5.791-.184 1.933-.368 3.866-.552 5.803-.184 1.937-.368 3.874-.552 5.815-.184 1.941-.368 3.882-.552 5.827-.184 1.945-.368 3.890-.552 5.839-.184 1.949-.368 3.898-.552 5.851-.184 1.953-.368 3.906-.552 5.863-.184 1.957-.368 3.914-.552 5.875-.184 1.961-.368 3.922-.552 5.887-.184 1.965-.368 3.930-.552 5.899-.184 1.969-.368 3.938-.552 5.911-.184 1.973-.368 3.946-.552 5.923-.184 1.977-.368 3.954-.552 5.935-.184 1.981-.368 3.962-.552 5.947-.184 1.985-.368 3.970-.552 5.959-.184 1.989-.368 3.978-.552 5.971-.184 1.993-.368 3.986-.552 5.983-.184 1.997-.368 3.994-.552 5.995-.184 2.001-.368 4.002-.552 6.007-.184 2.005-.368 4.010-.552 6.019-.184 2.009-.368 4.018-.552 6.031-.184 2.013-.368 4.026-.552 6.043-.184 2.017-.368 4.034-.552 6.055-.184 2.021-.368 4.042-.552 6.067-.184 2.025-.368 4.050-.552 6.079-.184 2.029-.368 4.058-.552 6.091-.184 2.033-.368 4.066-.552 6.103-.184 2.037-.368 4.074-.552 6.115-.184 2.041-.368 4.082-.552 6.127-.184 2.045-.368 4.090-.552 6.139-.184 2.049-.368 4.098-.552 6.151-.184 2.053-.368 4.106-.552 6.163-.184 2.057-.368 4.114-.552 6.175-.184 2.061-.368 4.122-.552 6.187-.184 2.065-.368 4.130-.552 6.199-.184 2.069-.368 4.138-.552 6.211-.184 2.073-.368 4.146-.552 6.223-.184 2.077-.368 4.154-.552 6.235-.184 2.081-.368 4.162-.552 6.247-.184 2.085-.368 4.170-.552 6.259-.184 2.089-.368 4.178-.552 6.271-.184 2.093-.368 4.186-.552 6.283-.184 2.097-.368 4.194-.552 6.295-.184 2.101-.368 4.202-.552 6.307-.184 2.105-.368 4.210-.552 6.319-.184 2.109-.368 4.218-.552 6.331-.184 2.113-.368 4.226-.552 6.343-.184 2.117-.368 4.234-.552 6.355-.184 2.121-.368 4.242-.552 6.367-.184 2.125-.368 4.250-.552 6.379-.184 2.129-.368 4.258-.552 6.391-.184 2.133-.368 4.266-.552 6.403-.184 2.137-.368 4.274-.552 6.415-.184 2.141-.368 4.282-.552 6.427-.184 2.145-.368 4.290-.552 6.439-.184 2.149-.368 4.298-.552 6.451-.184 2.153-.368 4.306-.552 6.463-.184 2.157-.368 4.314-.552 6.475-.184 2.161-.368 4.322-.552 6.487-.184 2.165-.368 4.330-.552 6.499-.184 2.169-.368 4.338-.552 6.511-.184 2.173-.368 4.346-.552 6.523-.184 2.177-.368 4.354-.552 6.535-.184 2.181-.368 4.362-.552 6.547-.184 2.185-.368 4.370-.552 6.559-.184 2.189-.368 4.378-.552 6.571-.184 2.193-.368 4.386-.552 6.583-.184 2.197-.368 4.394-.552 6.595-.184 2.201-.368 4.402-.552 6.607-.184 2.205-.368 4.410-.552 6.619-.184 2.209-.368 4.418-.552 6.631-.184 2.213-.368 4.426-.552 6.643-.184 2.217-.368 4.434-.552 6.655-.184 2.221-.368 4.442-.552 6.667-.184 2.225-.368 4.450-.552 6.679-.184 2.229-.368 4.458-.552 6.691-.184 2.233-.368 4.466-.552 6.703-.184 2.237-.368 4.474-.552 6.715-.184 2.241-.368 4.482-.552 6.727-.184 2.245-.368 4.490-.552 6.739-.184 2.249-.368 4.498-.552 6.751-.184 2.253-.368 4.506-.552 6.763-.184 2.257-.368 4.514-.552 6.775-.184 2.261-.368 4.522-.552 6.787-.184 2.265-.368 4.530-.552 6.799-.184 2.269-.368 4.538-.552 6.811-.184 2.273-.368 4.546-.552 6.823-.184 2.277-.368 4.554-.552 6.835-.184 2.281-.368 4.562-.552 6.847-.184 2.285-.368 4.570-.552 6.859-.184 2.289-.368 4.578-.552 6.871-.184 2.293-.368 4.586-.552 6.883-.184 2.297-.368 4.594-.552 6.895-.184 2.301-.368 4.602-.552 6.907-.184 2.305-.368 4.610-.552 6.919-.184 2.309-.368 4.618-.552 6.931-.184 2.313-.368 4.626-.552 6.943-.184 2.317-.368 4.634-.552 6.955-.184 2.321-.368 4.642-.552 6.967-.184 2.325-.368 4.650-.552 6.979-.184 2.329-.368 4.658-.552 6.991-.184 2.333-.368 4.666-.552 7.003-.184 2.337-.368 4.674-.552 7.015-.184 2.341-.368 4.682-.552 7.027-.184 2.345-.368 4.690-.552 7.039-.184 2.349-.368 4.698-.552 7.051-.184 2.353-.368 4.706-.552 7.063-.184 2.357-.368 4.714-.552 7.075-.184 2.361-.368 4.722-.552 7.087-.184 2.365-.368 4.730-.552 7.099-.184 2.369-.368 4.738-.552 7.111-.184 2.373-.368 4.746-.552 7.123-.184 2.377-.368 4.754-.552 7.135-.184 2.381-.368 4.762-.552 7.147-.184 2.385-.368 4.770-.552 7.159-.184 2.389-.368 4.778-.552 7.171-.184 2.393-.368 4.786-.552 7.183-.184 2.397-.368 4.794-.552 7.195-.184 2.401-.368 4.802-.552 7.207-.184 2.405-.368 4.810-.552 7.219-.184 2.409-.368 4.818-.552 7.231-.184 2.413-.368 4.826-.552 7.243-.184 2.417-.368 4.834-.552 7.255-.184 2.421-.368 4.842-.552 7.267-.184 2.425-.368 4.850-.552 7.279-.184 2.429-.368 4.858-.552 7.291-.184 2.433-.368 4.866-.552 7.303-.184 2.437-.368 4.874-.552 7.315-.184 2.441-.368 4.882-.552 7.327-.184 2.445-.368 4.890-.552 7.339-.184 2.449-.368 4.898-.552 7.351-.184 2.453-.368 4.906-.552 7.363-.184 2.457-.368 4.914-.552 7.375-.184 2.461-.368 4.922-.552 7.387-.184 2.465-.368 4.930-.552 7.399-.184 2.469-.368 4.938-.552 7.411-.184 2.473-.368 4.946-.552 7.423-.184 2.477-.368 4.954-.552 7.435-.184 2.481-.368 4.962-.552 7.447-.184 2.485-.368 4.970-.552 7.459-.184 2.489-.368 4.978-.552 7.471-.184 2.493-.368 4.986-.552 7.483-.184 2.497-.368 4.994-.552 7.495-.184 2.501-.368 5.002-.552 7.507z"/>
    </svg>
  </div>
  <blockquote class="italic text-lg mb-4">"${component.props.quote}"</blockquote>
  <div class="text-center">
    <p class="font-semibold text-purple-300">${component.props.author}</p>
    <p class="text-sm text-slate-400">${component.props.company}</p>
  </div>
</div>`;

        default:
          return '';
      }
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ComponentForge Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${tier === 'free' ? '<!-- ComponentForge Free Export - Upgrade to Pro for full features -->' : ''}
</head>
<body class="bg-slate-900 text-white p-8">
  <div class="space-y-8">
    ${htmlParts.join('\n\n')}
  </div>
  ${tier === 'free' ? '<div class="text-center mt-12 p-4 border border-purple-500/30 rounded-lg bg-purple-500/10"><p class="text-purple-300">Generated with ComponentForge Free</p><a href="https://componentforge.com/pro" class="text-purple-400 hover:text-purple-300">Upgrade to Pro →</a></div>' : ''}
</body>
</html>`;
  };

  const generateReactCode = () => {
    const componentParts = components.map(component => {
      switch (component.type) {
        case 'hero':
          return `
// Hero Component
export const HeroSection = ({ 
  headline = "${component.props.headline}",
  subheadline = "${component.props.subheadline}",
  primaryCTA = "${component.props.primaryCTA}"
}) => (
  <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-16 px-8 rounded-lg">
    <h1 className="text-5xl font-bold mb-4">{headline}</h1>
    <p className="text-lg mb-6">{subheadline}</p>
    <button className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      {primaryCTA}
    </button>
  </section>
);`;

        case 'feature':
          return `
// Feature Component
export const FeatureCard = ({ 
  headline = "${component.props.headline}",
  description = "${component.props.description}"
}) => (
  <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
      <StarIcon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{headline}</h3>
    <p className="text-slate-300">{description}</p>
  </div>
);`;

        case 'button':
          return `
// Button Component
export const CTAButton = ({ 
  text = "${component.props.text}",
  onClick = () => {}
}) => (
  <button 
    onClick={onClick}
    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
  >
    {text}
  </button>
);`;

        case 'testimonial':
          return `
// Testimonial Component
export const TestimonialCard = ({ 
  quote = "${component.props.quote}",
  author = "${component.props.author}",
  company = "${component.props.company}"
}) => (
  <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
    <QuoteIcon className="w-8 h-8 text-purple-400 mx-auto mb-4 opacity-60" />
    <blockquote className="italic text-lg mb-4">"{quote}"</blockquote>
    <div className="text-center">
      <p className="font-semibold text-purple-300">{author}</p>
      <p className="text-sm text-slate-400">{company}</p>
    </div>
  </div>
);`;

        default:
          return '';
      }
    });

    return `import React from 'react';
${tier === 'free' ? '// ComponentForge Free Export - Upgrade to Pro for TypeScript definitions and tests' : ''}

${componentParts.join('\n\n')}

// Main App Component
export default function App() {
  return (
    <div className="bg-slate-900 text-white p-8">
      <div className="space-y-8">
        {/* Your components here */}
        ${tier === 'free' ? '// Add your components manually' : components.map(c => `<${c.type === 'hero' ? 'HeroSection' : c.type === 'feature' ? 'FeatureCard' : c.type === 'button' ? 'CTAButton' : 'TestimonialCard'} />`).join('\n        ')}
      </div>
      ${tier === 'free' ? `
      <div className="text-center mt-12 p-4 border border-purple-500/30 rounded-lg bg-purple-500/10">
        <p className="text-purple-300">Generated with ComponentForge Free</p>
        <a href="https://componentforge.com/pro" className="text-purple-400 hover:text-purple-300">
          Upgrade to Pro →
        </a>
      </div>` : ''}
    </div>
  );
}`;
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
      
      toast({
        title: "Code Copied!",
        description: `${type} code has been copied to your clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File Downloaded!",
      description: `${filename} has been downloaded.`,
    });
  };

  const exportToPNG = async () => {
    // This would normally use html2canvas or similar
    toast({
      title: "PNG Export",
      description: "PNG export functionality would be implemented here.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-slate-900 border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Export Your Components
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 w-full bg-slate-800/50">
            <TabsTrigger value="png" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              PNG Preview
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              HTML/CSS
              {tier === 'free' && <Crown className="w-3 h-3 text-yellow-400" />}
            </TabsTrigger>
            <TabsTrigger value="react" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              React
              {tier === 'free' && <Crown className="w-3 h-3 text-yellow-400" />}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 mt-6">
            <TabsContent value="png" className="h-full">
              <Card className="h-full bg-slate-800/30 backdrop-blur-xl border-white/10 p-6">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/10">
                    <ImageIcon className="w-12 h-12 text-slate-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">PNG Preview Export</h3>
                    <p className="text-slate-400 mb-6">
                      Export your design as a high-quality PNG image for presentations and mockups.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={exportToPNG}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                      size="lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download PNG (2x Resolution)
                    </Button>
                    
                    <p className="text-xs text-slate-500 text-center">
                      Free • Includes ComponentForge watermark
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="html" className="h-full">
              <Card className="h-full bg-slate-800/30 backdrop-blur-xl border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold">HTML + Tailwind CSS</span>
                    {tier === 'free' && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                        Limited
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => copyToClipboard(generateHTMLCode(), 'HTML')}
                    >
                      {copiedCode === 'HTML' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => downloadFile(generateHTMLCode(), 'component.html', 'text/html')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg overflow-auto h-full">
                    <code>{generateHTMLCode()}</code>
                  </pre>
                </div>

                {tier === 'free' && (
                  <div className="p-4 border-t border-white/10 bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300 font-medium">Limited Export</p>
                        <p className="text-xs text-slate-400">Pro includes clean code, no watermarks, and advanced features</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="react" className="h-full">
              <Card className="h-full bg-slate-800/30 backdrop-blur-xl border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold">React Components</span>
                    {tier === 'free' && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                        Limited
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => copyToClipboard(generateReactCode(), 'React')}
                    >
                      {copiedCode === 'React' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => downloadFile(generateReactCode(), 'Components.jsx', 'text/javascript')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg overflow-auto h-full">
                    <code>{generateReactCode()}</code>
                  </pre>
                </div>

                {tier === 'pro' && (
                  <div className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Pro Features Included
                        </p>
                        <p className="text-xs text-slate-400">TypeScript definitions, Storybook files, and Jest tests</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Push to GitHub
                      </Button>
                    </div>
                  </div>
                )}

                {tier === 'free' && (
                  <div className="p-4 border-t border-white/10 bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300 font-medium">Basic React Export</p>
                        <p className="text-xs text-slate-400">Pro includes TypeScript, tests, Storybook, and GitHub integration</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
