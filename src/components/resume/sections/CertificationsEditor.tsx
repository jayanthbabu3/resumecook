import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import type { CertificationItem } from '@/types/resume';

interface CertificationsEditorProps {
  items: CertificationItem[];
  onChange: (items: CertificationItem[]) => void;
}

export function CertificationsEditor({ items, onChange }: CertificationsEditorProps) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id || null);

  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...items, newCert]);
    setExpanded(newCert.id);
  };

  const updateCertification = (id: string, field: keyof CertificationItem, value: string) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeCertification = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
    if (expanded === id) setExpanded(null);
  };

  return (
    <div className="space-y-4">
      {items.map((cert) => (
        <Card key={cert.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary transition-colors"
              >
                {cert.name || 'Untitled Certification'}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(cert.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            {expanded === cert.id && (
              <div className="space-y-3 pt-2 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label>Certification Name *</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      placeholder="AWS Solutions Architect"
                    />
                  </div>

                  <div>
                    <Label>Issuer *</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>

                  <div>
                    <Label>Date Issued *</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Credential ID</Label>
                    <Input
                      value={cert.credentialId || ''}
                      onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                  </div>

                  <div>
                    <Label>Expiry Date</Label>
                    <Input
                      type="month"
                      value={cert.expiryDate || ''}
                      onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>
                      Credential URL
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </a>
                      )}
                    </Label>
                    <Input
                      type="url"
                      value={cert.url || ''}
                      onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Button onClick={addCertification} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}
